var webSiteName = document.getElementById('siteName');
var webSiteURL = document.getElementById('siteURL');
var addBtn = document.getElementById('addBtn')
var container = [];
if (localStorage.getItem("contents") !== null) {
    container = JSON.parse(localStorage.getItem("contents"));
    display(container);
}

function addContent() {
    if (validateInputs(webSiteName) && validateInputs(webSiteURL) == true) {
        var site = {
            name: webSiteName.value,
            url: webSiteURL.value
        }
        container.push(site);
        localStorage.setItem("contents", JSON.stringify(container));
        display(container);
        clear();
    }

}


function display(arr) {
    var cartona = ``;
    for (var i = 0; i < arr.length; i++) {

        cartona += `<tr>
                        <td>${i + 1}</td>
                        <td>${container[i].name}</td>
                        <td>
                            <button class="btn custom-btn">
                                <a class="text-white text-decoration-none" target="_blank" href="${container[i].url}"><i class="fa-solid fa-eye pe-2"></i>
                                    Visit </a>

                            </button>
                        </td>
                        <td>
                            <button onclick="deleteSite(${i});" class="btn custom-btn2">
                                <i class="fa-solid fa-trash-can"></i>
                                Delete
                            </button>
                        </td>
                    </tr>`
    }
    document.getElementById("tableContent").innerHTML = cartona;
}

function clear() {
    webSiteName.value = null;
    webSiteURL.value = null;
    webSiteName.classList.remove("is-valid")
    webSiteURL.classList.remove("is-valid")
}

function deleteSite(index) {
    container.splice(index, 1);
    display(container);
    localStorage.setItem("contents", JSON.stringify(container));
}

function validateInputs(element) {
    var regex = {
        siteName: /^[A-Z][a-z0-9]{2,60}$/,
        siteURL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/
    }
    if (regex[element.id].test(element.value) == true) {
        element.nextElementSibling.classList.add('d-none');
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true
    } else {
        element.nextElementSibling.classList.remove('d-none');
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        return false
    }
}
