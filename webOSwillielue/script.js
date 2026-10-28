var selectedIcon = undefined;
var biggestIndex = 1;

function dragElement(element) {
    var headerEl = element.querySelector("[id$='header']") || element;
    var initialX = 0;
    var initialY = 0;
    var currentX = 0;
    var currentY = 0;
    headerEl.onmousedown = startDragging;

    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// closing and opening window
function closeWindow(element) {
    if (!element) return;
    element.style.display = "none";
}

function openWindow(element) {
    if (!element) return;
    element.style.display = "flex";
    biggestIndex++;
    element.style.zIndex = biggestIndex;

    var topBar = element.querySelector("[id$='header']");
    if (topBar) topBar.style.zIndex = biggestIndex + 1;
}

function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    var topBar = element.querySelector("[id$='header']");
    if (topBar) topBar.style.zIndex = biggestIndex + 1;
    deselectIcon(selectedIcon);
}

function addWindowTapHandling(element) {
    if (!element) return;
    element.addEventListener("mousedown", (e) => {
        e.stopPropagation(); 
        handleWindowTap(element);
    });
}

// icon
function selectIcon(element) {
    // If another icon is already selected, clean it up first
    if (selectedIcon && selectedIcon !== element) {
        deselectIcon(selectedIcon);
    }
    element.classList.add("selected-icon");
    selectedIcon = element;
}

function deselectIcon(element) {
    if (!element) return;
    element.classList.remove("selected-icon");
    if (selectedIcon === element) {
        selectedIcon = undefined;
    }
}

function handleIconTap(element, welcomeScreen) {
    if (element.classList.contains("selected-icon")) {
        deselectIcon(element);
        openWindow(welcomeScreen);
    } else {
        selectIcon(element);
    }
}

// initialize
function initializedWindow(appPrefix) {
    var screen = document.getElementById(appPrefix + "Window");
    if(screen) {
        addWindowTapHandling(screen);
        dragElement(screen);
    }
}

//welcome window
var welcomeScreen = document.getElementById("welcome");
var welcomeScreenClose = document.getElementById("welcomeclose");
var welcomeScreenOpen = document.getElementById("welcomeopen");

if (welcomeScreen) {
    dragElement(welcomeScreen);
    addWindowTapHandling(welcomeScreen);
}

if (welcomeScreenClose) {
    welcomeScreenClose.addEventListener("click", () => closeWindow(welcomeScreen));
}

if (welcomeScreenOpen) {
    welcomeScreenOpen.addEventListener("click", () => openWindow(welcomeScreen));
}

// app 1- lue :D
var Icon = document.querySelector("#LueIconContainer");
var lueScreen = document.querySelector("#LueWindow");
var lueScreenClose = document.querySelector("#lueclose");

if (Icon) {
    Icon.addEventListener("click", (e) => {
        e.stopPropagation();
        handleIconTap(Icon, lueScreen);
    });
}

if (lueScreenClose) {
    lueScreenClose.addEventListener("click", (e) => {
        e.stopPropagation();
        closeWindow(lueScreen);
    });
}

initializedWindow("Lue");

//content info in lue window
var content = [
    { 
        title: "luecontent",
        date: "10/25/26",
        content:`
                <p>
                    <span>
                        <strong>who is lue?</strong>
                        <br>
                        lue is a creature (combination of a tardigrade and a turtle) who rarely speaks, 
                        but loves taking on crazy adventures with willie. lue is the type to roll 
                        around in mid-air whenever willie is idle. (fun fact: his name came from 
                        a well-known quote, “Life, the Universe, and Everything,” 
                        from the book, The Hitchhiker's Guide to the Galaxy, by Douglas Adams)
                        <br>
                        <br>
                        <strong>★ q&a with lue!! ★</strong>
                        <br>
                        <br>
                        Q1: what is your favorite food?
                        <br>
                        lue: meep. (pebbles)
                        <br>
                        <br>
                        Q2: what do you like about willie?
                        <br>
                        lue: meep! (his passion!)
                        <br>
                        <br>
                        Q3: out of all of the places you've explored, which one is your favorite?
                        <br>
                        lue: mmeeep... meep! (hmmmm... the ocean near that one meteorite!)
                        
                    </span>
                </p>
                `
    }
];

function setlueinfo(index) {
    var lueinfo = document.querySelector("#lueinfo");
    if (lueinfo) {
        lueinfo.innerHTML = content[index].content;
    }
}

setlueinfo(0);

function addToSideBar(index) {
    var sidebar = document.querySelector("#sidebar");
    if (!sidebar) return;
    var luecontents = content[index];
    var newDiv = document.createElement("div");

    newDiv.innerHTML = `
        <p style="margin: 0px;">
            ${luecontents.title}
        </p>
        <p style= "font-size: 12px; margin: 0px">
            ${luecontents.date}
        </p>
    `;

    newDiv.addEventListener("click", function() {
        setlueinfo(index);
    });

    sidebar.appendChild(newDiv);
}

for (let i=0; i < content.length; i++) {
    addToSideBar(i);
}

//app 2- willie >:D
var willieIcon = document.querySelector("#WillieIconContainer");
var willieScreen = document.querySelector("#WillieWindow");
var willieScreenClose = document.querySelector("#willieclose");

if (willieIcon) {
    willieIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        handleIconTap(willieIcon, willieScreen);
    });
}

if (willieScreenClose) {
    willieScreenClose.addEventListener("click", (e) => {
        e.stopPropagation();
        closeWindow(willieScreen);
    });
}

initializedWindow("Willie");

document.addEventListener("click", () => {
    deselectIcon(selectedIcon);
});

var content1 = [
    {
        title: "williecontent",
        date: "10/27/26",
        content:`
                <p>
                    <span>
                        <strong>who is willie?</strong>
                        <br>
                        willie is a  curious living blob with immense curiosity 
                        and a deep desire to explore anything, even if it defies 
                        reality. he's the type of fellow to be spontaneous even 
                        when he's facing a risky situation. (fun fact: he likes to 
                        journal during his spare time.)
                        <br>
                        <br>
                        <strong>★ q&a with willie!! ★</strong>
                        <br>
                        <br>
                        Q1: what is your favorite animal?
                        <br>
                        willie: lue! (lue: meep?? (what??))
                        <br>
                        <br>
                        Q2: what do you like about lue?
                        <br>
                        willie: everything? we are best buds hehe!
                        <br>
                        <br>
                        Q3: out of all of the places you've explored, which one is your least favorite?
                        <br>
                        willie: that one museum trip where we had to stare at wet paint for long time- 
                        just thinking about it haunts me ;-;.  
                    </span>
                `
    }
]

function setwillieinfo(index) {
    var willieinfo = document.querySelector("#willieinfo");
    if (willieinfo) {
        willieinfo.innerHTML = content1[index].content;
    }
}

setwillieinfo(0);

function addToSideBar1(index) {
    var sidebar1 = document.querySelector("#sidebar1");
    if (!sidebar1) return;
    var williecontents = content1[index];
    var newDiv = document.createElement("div");

    newDiv.innerHTML = `
        <p style="margin: 0px;">
            ${williecontents.title}
        </p>
        <p style= "font-size: 12px; margin: 0px">
            ${williecontents.date}
        </p>
    `;

    newDiv.addEventListener("click", function() {
        setwillieinfo(index);
        });

    sidebar1.appendChild(newDiv);
}

for (let i = 0; i < content1.length; i++) {
    addToSideBar1(i);
}



//app 3- random adventure >:DD
var adventureIcon = document.querySelector("#randomadventureIcon");
var adventureScreen = document.querySelector("#adventureWindow");
var adventureScreenClose = document.querySelector("#adventureclose");
var adventureimgs = [
    "./accretionwillieandlue.png",
    "./artemismoonwillieandlue.png",
    "./mantaraywillieandlue.png",
    "./moon.png"
];

function randomadventure() {
    var imgElement = document.querySelector("#randomadventureimg");

    if (imgElement && adventureimgs.length > 0) {
        var randomIndex = Math.floor(Math.random() * adventureimgs.length);
        imgElement.src = adventureimgs[randomIndex];
    }
}

if (adventureIcon) {
    adventureIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        if (adventureIcon.classList.contains("selected-icon")) {
            deselectIcon(adventureIcon);
            openWindow(adventureScreen);
            setTimeout(randomadventure, 10);
        } else {
            selectIcon(adventureIcon);
        }
        handleIconTap(adventureIcon, adventureScreen);
        randomadventure();
    });
}

if (adventureScreenClose) {
    adventureScreenClose.addEventListener("click", (e) => {
        e.stopPropagation();
        closeWindow(adventureScreen);
    });
}

initializedWindow("adventure");

document.addEventListener("click", () => {
    deselectIcon(selectedIcon);
});





