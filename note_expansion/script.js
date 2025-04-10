document.addEventListener("DOMContentLoaded", function () {
    const note = document.getElementById("note");
    const saveButton = document.getElementById("save");

    // 🟢 저장된 메모 불러오기
    chrome.storage.local.get(["noteContent"], (result) => {
        if (result.noteContent) {
            note.value = result.noteContent; // 저장된 텍스트 불러오기
        }
    });

    //🟢노트 포커스
    note.focus();

    // 🟢 파일 저장 기능
    async function saveNote() {
        try {
            if (note.value.trim() === "") {
                alert("Note is empty. Please write something before saving.");
                return;
            }

            const fileHandle = await window.showSaveFilePicker({
                suggestedName: "my_note.txt",
                types: [{ description: "Text Files", accept: { "text/plain": [".txt"] } }],
            });

            const writable = await fileHandle.createWritable();
            await writable.write(note.value);
            await writable.close();
            alert("File saved successfully!");
        } catch (error) {
            console.error("File save error:", error);
        }
    }

    // 🟢 저장 버튼 클릭 시 파일 저장
    saveButton.addEventListener("click", saveNote);

    // 🟢 단축키 Ctrl + Shift + S로 파일 저장
    document.addEventListener("keydown", (event) => {
        console.log(`Key pressed: ${event.key}, Ctrl: ${event.ctrlKey}, Shift: ${event.shiftKey}`);
        if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "s") {
            event.preventDefault(); // 기본 동작 방지
            console.log("Save shortcut triggered");
            saveNote();
        }
    });

    // 드래그 앤 드롭 기능
    document.addEventListener("dragover", (event) => event.preventDefault());
    document.addEventListener("drop", (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) loadFile(file);
    });

    function loadFile(file) {
        if (file.type === "text/plain") {
            const reader = new FileReader();
            reader.onload = (e) => {
                note.value = e.target.result;
                chrome.storage.local.set({ noteContent: note.value });
            };
            reader.readAsText(file);
        } else {
            alert("텍스트 파일만 불러올 수 있습니다.");
        }
    }

    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "save_note") {
            saveNote();
        }
    });
});