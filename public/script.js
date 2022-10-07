const droparea = document.querySelector(".dropfile");
const selectfile = document.querySelector(".selectfile");
const input = document.getElementById("csv-up");
const uploadForm = document.querySelector(".uploadForm");
const selectfileoptions = document.querySelector(".selectfile").innerHTML;
const csvicon = document.querySelector(".fa-file-csv");

let file;
droparea.addEventListener("dragover", (event) => {
  event.preventDefault();
  selectfile.innerHTML = "<p class='dropmsg'>Drop File Here</p>";
  droparea.classList.add("active");
  csvicon.classList.add("ico-green");
});
droparea.addEventListener("dragleave", () => {
  droparea.classList.remove("active");
  csvicon.classList.remove("ico-green");
  selectfile.innerHTML = selectfileoptions;
});
droparea.addEventListener("drop", (event) => {
  event.preventDefault();
  droparea.classList.add("active");
  csvicon.classList.add("ico-green");
  file = event.dataTransfer.files[0];
  console.log(file)
  selectfile.innerHTML = `<p class='filename'>${
    file.name.length < 25 ? file.name : formatString(file.name)
  }</p>`;
});
input.addEventListener("change", function () {
  console.log("change")
  file = this.files[0];
  console.log(file)
  selectfile.innerHTML = `<p class='filename'>${
    file.name.length < 25 ? file.name : formatString(file.name)
  }</p>`;
  droparea.classList.add("active");
  csvicon.classList.add("ico-green");
});

uploadForm.addEventListener("submit", (event) => {
  console.log("HI")
  console.log(file.name)
  event.preventDefault();
  const formData = new FormData();
  // const value = Object.fromEntries(formData.entries());
  // console.log(formData)
  const endpoint = "/upload";
  formData.append("file_data", file);
  formData.entries()
  fetch(endpoint, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      droparea.classList.remove("active");
      csvicon.classList.remove("ico-green");
      selectfile.innerHTML = selectfileoptions;
      console.log("submitted");
      formData.delete('file_data')
      
    })
    .catch((err) => {
      console.log("from Not Submitted");
      console.log(err);
    });
});

function formatString(fname) {
  if (fname.length >= 25)
    return (
      fname.slice(0, 20) +
      "..." +
      fname.slice(fname.length - 5, fname.length)
    );

  return fname;
}