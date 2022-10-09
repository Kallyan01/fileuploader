const droparea = document.querySelector(".dropfile");
const selectfile = document.querySelector(".selectfile");
const input = document.getElementById("csv-up");
const uploadForm = document.querySelector(".uploadForm");
const selectfileoptions = document.querySelector(".selectfile").innerHTML;
const csvicon = document.querySelector(".fa-file-csv");

var progressUpload = document.getElementsByClassName("progressUpload")[0];
var progress;
addProgressBar();

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

uploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!document.getElementsByClassName("filename")[0]) {
    // Show warning label to users
    console.log("No files have been selected.");
    document.getElementsByClassName('empty-upload-warning')[0].style.display = 'block';
    return;
  }
  // Hide warning label
  document.getElementsByClassName('empty-upload-warning')[0].style.display = 'none';
  console.log("HI")
  console.log(file.name)
  event.preventDefault();
  const formData = new FormData();
  // const value = Object.fromEntries(formData.entries());
  // console.log(formData)
  const endpoint = "/upload";
  formData.append("file_data", file);
  formData.entries()

  var req = new XMLHttpRequest();  
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      droparea.classList.remove("active");
      csvicon.classList.remove("ico-green");
      selectfile.innerHTML = selectfileoptions;
      console.log("submitted");
      formData.delete('file_data')
      setTimeout(() => {
        removeProgressBar() 
      }, 3000);

      clearTimeout()
    }
    if(this.onerror) {
      console.log("from Not Submitted");
      console.log(err);
    }
  }

  req.upload.addEventListener("progress", updateProgress);
  req.open("POST", endpoint, true);
  req.send(formData)
  console.log(req)
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

function addProgressBar(){
  var progressBar = document.createElement("div");
  progressBar.className = "progressBar";
  progressUpload.appendChild(progressBar);
  var innerDIV = document.createElement("div");
  innerDIV.className = "progress";
  progressBar.appendChild(innerDIV);
  progress = document.getElementsByClassName("progress")[0];
}

function removeProgressBar() {
  while (progressUpload.hasChildNodes()) {
    progressUpload.removeChild(progressUpload.firstChild);
  }
}

function updateProgress(e){   
      
  progress.style.width = (((e.loaded/e.total)*100))+ "%";
  progress.style.transition = "width 1s";

}
function resetProgressBar(){
  progress.style.width = "0%";
}