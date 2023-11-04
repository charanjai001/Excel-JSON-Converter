let selectedFile;
console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data = [{
    "name": "jayanth",
    "data": "scd",
    "abc": "sdef"
}]

document.getElementById('button').addEventListener("click", () => {
    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if (selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });
            console.log(workbook);
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                console.log(rowObject);
                document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject, undefined, 4)
            });
        }
    }
});

// Add event listener for the "Copy" button
document.getElementById('copyButton').addEventListener("click", () => {
    const jsondata = document.getElementById("jsondata");

    // Select the text within the <pre> element
    if (document.selection) {
        const range = document.body.createTextRange();
        range.moveToElementText(jsondata);
        range.select();
        document.execCommand("Copy");
        alert("JSON data copied to clipboard!");
    } else if (window.getSelection) {
        const range = document.createRange();
        range.selectNode(jsondata);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("Copy");
        window.getSelection().removeAllRanges();
        alert("JSON data copied to clipboard!");
    }
});
