// === ADD THESE AT THE TOP WITH GLOBAL VARIABLES ===
let w1Value = 0;
let w2Value = 0;
let currentInputType = ""; // 'w1' or 'w2'

// === ADD THESE NEW FUNCTIONS ===

// === RESIZE LOGIC ===
function scaleSimulation() {
    const app = document.querySelector('.sim-screen');
    const targetWidth = 1536;
    const targetHeight = 730;
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const scaleX = windowWidth / targetWidth;
    const scaleY = windowHeight / targetHeight;
    const scale = Math.min(scaleX, scaleY);
    
    app.style.transform = `scale(${scale})`;
}

window.addEventListener('load', scaleSimulation);
window.addEventListener('resize', scaleSimulation);

// === GLOBAL VARIABLES ===
let step = 0;

// === HELPER FUNCTIONS ===

// 1. UPDATE INSTRUCTION & STEP
function changeStep(newStep) {
    step = newStep;
    
    // We strictly use the integer part (e.g. 6.5 becomes 6)
    // This allows intermediate animations to keep the same instruction
    let cleanStep = Math.floor(step);

    // Update the attribute on the main container
    // CSS will read this 'data-step' and update the text automatically
    document.querySelector('.sim-screen').setAttribute('data-step', cleanStep);
}

// 2. UNLOCK NEXT BUTTON
function unlockNextBtn() {
    let nextBtn = document.getElementById("nextBtn");
    nextBtn.style.opacity = 1;
    nextBtn.style.pointerEvents = "auto";
    nextBtn.style.animation = "blink 1.2s infinite ease-in-out";
}

// 3. SHOW ARROW HELPER
function triggerArrow(id) {
    let arrow = document.getElementById(id);
    if(arrow) {
        arrow.style.opacity = 1;
        arrow.style.animation = "blinkArrow 1.1s infinite ease-in-out";
    }
}


// === NEXT BUTTON LOGIC ===
document.getElementById("nextBtn").addEventListener("click", () => {

    // 1. LOCK BUTTON IMMEDIATELY
    let nextBtn = document.getElementById("nextBtn");
    if (nextBtn.style.opacity == 0.5) return; 
    
    nextBtn.style.animation = "none";
    nextBtn.style.opacity = 0.5;
    nextBtn.style.pointerEvents = "none";

    let title = document.getElementById("titleScreen");
    let stand = document.getElementById("standImg");
    let trap = document.getElementById("trapImg");
    let trap1 = document.getElementById("trap1Img");
    let cylinder = document.getElementById("cylinderImg");
    let spade = document.getElementById("spadeImg");
    let tray = document.getElementById("trayImg");
    let arrow = document.getElementById("arrowImg");

    // --- STEP 0 ---
    if (step === 0) {
        title.style.transition = "0.5s";
        title.style.opacity = 0;

        document.getElementById("weightMachine").classList.remove("second-weighing-pos");
        document.getElementById("pointerImg").classList.remove("second-weighing-pos");

        setTimeout(() => {
            title.style.display = "none";
            stand.style.opacity = 1;
            trap.style.opacity = 1;
            trap1.style.opacity = 1;
            
            changeStep(1); // UPDATE INSTRUCTION
            unlockNextBtn();
        }, 600);
    }

    // --- STEP 1 ---
    else if (step === 1) {
        cylinder.style.opacity = 1;
        changeStep(2); // UPDATE INSTRUCTION
        setTimeout(unlockNextBtn, 600);
    }

    // --- STEP 2 ---
    else if (step === 2) {
        spade.style.opacity = 1;
        tray.style.opacity = 1;
        changeStep(3); // UPDATE INSTRUCTION
        setTimeout(unlockNextBtn, 600); 
    }

    // --- STEP 3 ---
    else if (step === 3) {
        arrow.style.opacity = 1;
        arrow.style.animation = "blinkArrow 1.1s infinite ease-in-out";
        changeStep(4); // UPDATE INSTRUCTION
    }

    // --- STEP 7 ---
    else if (step === 7) {
        let arrowLeft = document.getElementById("arrowLeftImg");
        arrowLeft.style.opacity = 1;
        arrowLeft.style.animation = "blinkArrowLeft 1.1s infinite ease-in-out";
        changeStep(8); // UPDATE INSTRUCTION
    }

    // --- STEP 10 ---
    else if (step === 10) {
        let wm = document.getElementById("weightMachine");
        let pointer = document.getElementById("pointerImg");
        let cylinder = document.getElementById("cylinderImg");
        let arrowLeft = document.getElementById("arrowLeftImg");

        wm.style.opacity = 1;
        pointer.style.opacity = 1;

        cylinder.style.cursor = "pointer";
        cylinder.style.pointerEvents = "auto"; 

        arrowLeft.style.left = "41%";  
        arrowLeft.style.top = "69%"; 
        
        setTimeout(() => {
            arrowLeft.style.opacity = 1;
            arrowLeft.style.animation = "blinkArrowLeft 1.1s infinite ease-in-out";
        }, 700);
    }

    // --- STEP 11 ---
    else if (step === 11) {
        [
            "standImg","trapImg","trap1Img","cylinderImg","concrete4FinalImg","weightMachine",
            "pointerImg","concreteImg","concrete1Img",
            "concrete2Img","concreteFinal2Img","concrete3Img","concrete3FinalImg",
            "concrete4Img","arrowImg","arrowLeftImg","arrowLeft2Img"
        ].forEach(id => {
            let el = document.getElementById(id);
            if (el) {
                el.style.opacity = 0;
                el.style.display = "none";
            }
        });

        let cyl1 = document.getElementById("cylinder1Img");
        let wm = document.getElementById("weightMachine");
        let pointer = document.getElementById("pointerImg");
        
        cyl1.style.display = "block";
        wm.style.display = "block";
        pointer.style.display = "block";

        wm.classList.add("second-weighing-pos");
        pointer.classList.add("second-weighing-pos");
        
        wm.style.opacity = 1;
        pointer.style.opacity = 1;
        
        pointer.style.transition = "transform 1.0s ease-out";
        pointer.style.transform = "rotate(45deg)";

        let valText = document.getElementById("weightValueText");

        valText.style.left = "28%"; 
        valText.style.bottom = "28%"; 
        valText.style.right = "auto";

        setTimeout(() => {
            valText.innerText = "W = 10.0 kg"; 
            valText.style.opacity = 1;

            setTimeout(() => {
                openInputModal('w');
            }, 800);
        }, 100);

        setTimeout(() => {
            cyl1.style.opacity = 1;
        }, 60);
    }

    // --- STEP 12 ---
    else if (step === 12) {
        document.getElementById('weightValueText').style.opacity = 0;
        document.getElementById('weightMachine').style.opacity = 0;
        document.getElementById('pointerImg').style.opacity = 0;
        triggerArrow("arrow5Img");
        changeStep(13); // UPDATE INSTRUCTION
    }

    // --- STEP 15 ---
    else if (step === 15) {
        setupLeveler(); 
    }

    // --- STEP 16 ---
    else if (step === 16) {
        triggerArrow("arrow7Img");
        changeStep(17); // UPDATE INSTRUCTION
    }

    // --- STEP 19 ---
    else if (step === 19) {
        setupLeveler();
    }

    // --- STEP 20 ---
    else if (step === 20) {
        triggerArrow("arrow9Img");
        changeStep(21); // UPDATE INSTRUCTION
    }

    // --- STEP 23 ---
    else if (step === 23) {
        setupLeveler();
    }

    // --- STEP 24 ---
    else if (step === 24) {
        triggerArrow("arrow10Img");
        changeStep(25); // UPDATE INSTRUCTION
    }

    // --- STEP 27 ---
    else if (step === 27) {
        setupLeveler();
    }

    // --- STEP 28 ---
    else if (step === 28) {
        // --- UPDATED LOGIC: No movement, just final weigh ---
        let pointer = document.getElementById("pointerImg");
        let valText = document.getElementById("weightValueText");
        let wm = document.getElementById("weightMachine");
        
        wm.style.display = "block";
        pointer.style.display = "block";

        wm.classList.add("second-weighing-pos");
        
        setTimeout(() => { 
            wm.style.opacity = 1;
            pointer.style.opacity = 1;
        }, 300);

        // Ensure pointer is at final position
        pointer.style.transition = "transform 1.0s ease-out";
        pointer.style.transform = "rotate(90deg)"; 

        // Position text near the machine (since we moved the machine to center in Step 11)
        valText.style.left = "28%"; 
        valText.style.bottom = "28%"; 
        valText.style.right = "auto";

        setTimeout(() => {
            valText.innerText = "W2 = 17.0 kg"; 
            valText.style.opacity = 1;     
        }, 1000);

        // Open Input
        setTimeout(() => {
            openInputModal('w2');
        }, 2500);
    }
});


// === INTERACTION HANDLERS ===
function startCylinderMovement() {
    let cylinder = document.getElementById("cylinderImg");
    let c4Final = document.getElementById("concrete4FinalImg");
    let pointer = document.getElementById("pointerImg");

    // Position Locking
    let cylLeft = cylinder.offsetLeft - (cylinder.offsetWidth / 2);
    let cylTop = cylinder.offsetTop - (cylinder.offsetHeight / 2);
    cylinder.style.position = "absolute";
    cylinder.style.left = cylLeft + "px";
    cylinder.style.top = cylTop + "px";
    cylinder.style.transform = "translate(0,0)";

    let c4Left = c4Final.offsetLeft;
    let c4Top = c4Final.offsetTop;
    c4Final.style.position = "absolute";
    c4Final.style.left = c4Left + "px";
    c4Final.style.top = c4Top + "px";
    c4Final.style.transform = "translate(0,0)";

    // Animations
    cylinder.style.animation = "moveRight1 0.9s ease-out forwards";
    c4Final.style.animation = "moveRight1 0.9s ease-out forwards";

    setTimeout(() => {
        cylinder.style.animation = "moveUp1 0.9s ease-out forwards";
        c4Final.style.animation = "moveUp1 0.9s ease-out forwards";
    }, 900);

    setTimeout(() => {
        cylinder.style.animation = "moveRight2 0.9s ease-out forwards";
        c4Final.style.animation = "moveRight2 0.9s ease-out forwards";
    }, 1800);

    setTimeout(() => {
        pointer.style.transition = "transform 1s ease-out";
        pointer.style.transform = "rotate(35deg)";

        setTimeout(() => {
            const valText = document.getElementById("weightValueText");
            valText.innerText = "W1 = 15.0 kg";
            valText.style.opacity = 1;
        }, 1000); // Shows shortly after needle starts moving
    }, 2700);

    setTimeout(() => {
        openInputModal('w1');
    }, 3700);
}


// SPADE CLICK
document.getElementById("spadeImg").addEventListener("click", () => {
    let spade = document.getElementById("spadeImg");
    let concrete = document.getElementById("concreteImg");
    let arrow = document.getElementById("arrowImg");
    let pointer = document.getElementById("pointerImg"); // Get Pointer

    // --- STEP 4: Shake Spade & Appear Concrete ---
    if (step === 4) {
        arrow.style.opacity = 0;
        arrow.style.animation = "none";
        spade.style.animation = "shakeSpade 0.8s ease-in-out";

        setTimeout(() => {
            spade.style.animation = "none";
            concrete.style.opacity = 1;
            
            // Calculate Center-to-Center Offset
            window.concreteOffsetX = concrete.offsetLeft - spade.offsetLeft;
            window.concreteOffsetY = concrete.offsetTop - spade.offsetTop;
            
            setTimeout(() => {
                triggerArrow("arrowImg");
            }, 300);
            changeStep(5); 
        }, 800);
    }

    // --- STEP 5: Lock Positions & Move Up (FIXED JUMP) ---
    else if (step === 5) {
        arrow.style.opacity = 0;
        arrow.style.animation = "none";

        // 1. Calculate Visual Top-Left for SPADE
        let spadeVisualLeft = spade.offsetLeft - (spade.offsetWidth / 2);
        let spadeVisualTop = spade.offsetTop - (spade.offsetHeight / 2);

        // 2. Calculate Visual Top-Left for CONCRETE (Use its OWN dimensions)
        // This prevents the jump because we don't rely on Spade's width
        let concreteVisualLeft = concrete.offsetLeft - (concrete.offsetWidth / 2);
        let concreteVisualTop = concrete.offsetTop - (concrete.offsetHeight / 2);

        // 3. Apply Absolute Positions (Remove Transform)
        spade.style.position = "absolute";
        spade.style.left = spadeVisualLeft + "px";
        spade.style.top = spadeVisualTop + "px";
        spade.style.transform = "translate(0,0)";

        concrete.style.position = "absolute";
        concrete.style.left = concreteVisualLeft + "px";
        concrete.style.top = concreteVisualTop + "px";
        concrete.style.transform = "translate(0,0)";

        // 4. Start Animations
        spade.style.animation = "moveUpTogether 0.7s ease-out forwards";
        concrete.style.animation = "moveUpTogether 0.7s ease-out forwards";

        setTimeout(() => {
            spade.style.animation = "moveLeftTogether 0.7s ease-out forwards";
            concrete.style.animation = "moveLeftTogether 0.7s ease-out forwards";
        }, 700);

        setTimeout(() => {
            concrete.style.animation = "dropConcrete 0.6s ease-out forwards";
            
            setTimeout(() => {
                concrete.style.opacity = 0;
                let c1 = document.getElementById("concrete1Img");
                c1.style.opacity = 1;
                setTimeout(() => triggerArrow("arrowImg"), 300);
            }, 600);

            setTimeout(() => {
                spade.style.animation = "spadeRightBack 0.6s ease-out forwards";
            }, 200);

            setTimeout(() => {
                spade.style.animation = "spadeDownBack 0.6s ease-out forwards";
            }, 900);

            setTimeout(() => triggerArrow("arrowImg"), 1600);

        }, 1400); 

        changeStep(6); 
    }

    // --- STEP 6: Shake Again (Concrete 2) ---
    else if (step === 6) {
        let newConcrete = document.getElementById("concrete2Img");
        arrow.style.opacity = 0;
        arrow.style.animation = "none";
        spade.style.animation = "shakeSpade2 1s ease-in-out";

        setTimeout(() => {
            spade.style.animation = "none";
            newConcrete.style.opacity = 1;
            
            // Calculate Position relative to Spade's CURRENT visual location
            // We reconstruct the center points to place Concrete 2 accurately
            let spadeVisualLeft = parseFloat(spade.style.left);
            let spadeVisualTop = parseFloat(spade.style.top);
            
            let centerSpadeX = spadeVisualLeft + (spade.offsetWidth / 2);
            let centerSpadeY = spadeVisualTop + (spade.offsetHeight / 2);

            let centerConcreteX = centerSpadeX + window.concreteOffsetX;
            let centerConcreteY = centerSpadeY + window.concreteOffsetY;

            // Subtract half of Concrete 2's width to center it
            let concrete2Left = centerConcreteX - (newConcrete.offsetWidth / 2);
            let concrete2Top = centerConcreteY - (newConcrete.offsetHeight / 2);

            newConcrete.style.position = "absolute";
            newConcrete.style.left = concrete2Left + "px";
            newConcrete.style.top = concrete2Top + "px";
            newConcrete.style.transform = "translate(0,0)";

            triggerArrow("arrowImg");
            changeStep(6.5); 
        }, 1000);
    }

    // --- STEP 6.5: Move & Drop Concrete 2 ---
    else if (step === 6.5) {
        let newConcrete = document.getElementById("concrete2Img");
        arrow.style.opacity = 0;
        arrow.style.animation = "none";

        spade.style.animation = "moveUpTogether 0.7s ease-out forwards";
        newConcrete.style.animation = "moveUpTogether 0.7s ease-out forwards";

        setTimeout(() => {
            spade.style.animation = "moveLeftTogether 0.7s ease-out forwards";
            newConcrete.style.animation = "moveLeftTogether 0.7s ease-out forwards";
        }, 700);

        setTimeout(() => {
            newConcrete.style.animation = "dropConcrete2 0.6s ease-out forwards";
            setTimeout(() => {
                newConcrete.style.opacity = 0;
                let c1 = document.getElementById("concrete1Img");
                let finalC2 = document.getElementById("concreteFinal2Img");
                c1.style.opacity = 0;
                finalC2.style.opacity = 1;
            }, 600);

            setTimeout(() => {
                spade.style.animation = "spadeRightBack2 0.6s ease-out forwards";
            }, 200);

            setTimeout(() => {
                spade.style.animation = "spadeDownBack2 0.6s ease-out forwards";
            }, 900);

            setTimeout(() => {
                changeStep(7); 
                unlockNextBtn();
            }, 1500);

        }, 1400); 
    }

    // ... (STEPS 13, 17, 21, 25 REMAIN THE SAME) ...
    
    else if (step === 13) {
        let arrow5 = document.getElementById("arrow5Img");
        let c5 = document.getElementById("concrete5Img");
        arrow5.style.opacity = 0;
        arrow5.style.animation = "none";
        spade.style.animation = "shakeSpade3 0.9s ease-in-out";

        setTimeout(() => {
            spade.style.animation = "none";
            let spadeLeft = parseFloat(spade.style.left) || spade.offsetLeft;
            let spadeTop = parseFloat(spade.style.top) || spade.offsetTop;
            let adjustX = 80; let adjustY = 59;
            c5.style.opacity = 1;
            c5.style.position = "absolute";
            c5.style.left = (spadeLeft + window.concreteOffsetX + adjustX) + "px";
            c5.style.top = (spadeTop + window.concreteOffsetY + adjustY) + "px";
            
            triggerArrow("arrow5Img");
            changeStep(14); 
        }, 900);
    }
    else if (step === 14) {
        let c5 = document.getElementById("concrete5Img");
        let c5Final = document.getElementById("concreteFinal5Img");
        let arrow5 = document.getElementById("arrow5Img");
        arrow5.style.opacity = 0;
        arrow5.style.animation = "none";

        let spadeLeft = parseFloat(spade.style.left) || spade.offsetLeft;
        let spadeTop = parseFloat(spade.style.top) || spade.offsetTop;
        let adjustX = 40; let adjustY = 40;
        c5.style.position = "absolute";
        c5.style.left = (spadeLeft + window.concreteOffsetX + adjustX) + "px";
        c5.style.top  = (spadeTop  + window.concreteOffsetY + adjustY) + "px";
        spade.style.transform = "translate(0, 0)";
        c5.style.transform    = "translate(0, 0)";

        setTimeout(() => {
            spade.style.transition = "transform 0.7s ease-out";
            c5.style.transition    = "transform 0.7s ease-out";
            spade.style.transform = "translate(0, -320px)";
            c5.style.transform    = "translate(0, -320px)";
        }, 50);

        setTimeout(() => {
            spade.style.transform = "translate(-250px, -320px)";
            c5.style.transform    = "translate(-250px, -320px)";
        }, 850);

        setTimeout(() => {
            c5.style.transition = "transform 0.6s ease-out";
            c5.style.transform = "translate(-250px, -50px)";
        }, 1600);

        setTimeout(() => {
            c5.style.opacity = 0;
            c5.style.display = "none";
            c5Final.style.display = "block";
            c5Final.style.visibility = "visible";
            setTimeout(() => { c5Final.style.opacity = 1; }, 50);

            // --- POINTER UPDATE (Weight Increase) ---
            pointer.style.transition = "transform 0.5s ease-out";
            pointer.style.transform = "translate(-50%, -50%) rotate(12deg)"; 

        }, 2200);

        setTimeout(() => {
            spade.style.transition = "transform 0.6s ease-out";
            spade.style.transform = "translate(0, -320px)";
        }, 2300);

        setTimeout(() => {
            spade.style.transform = "translate(0, 0)";
            changeStep(15); 
            unlockNextBtn();
        }, 3000);
    }

    else if (step === 17) {
        let arrow7 = document.getElementById("arrow7Img");
        let c7 = document.getElementById("concrete7Img");
        spade.style.pointerEvents = "none";
        arrow7.style.opacity = 0;
        arrow7.style.animation = "none";
        spade.style.animation = "shakeSpade3 0.9s ease-in-out";

        setTimeout(() => {
            spade.style.animation = "none";
            let spadeLeft = parseFloat(spade.style.left) || spade.offsetLeft;
            let spadeTop = parseFloat(spade.style.top) || spade.offsetTop;
            let adjustX = 40; let adjustY = 40; 
            c7.style.display = "block";
            c7.style.opacity = 1;
            c7.style.position = "absolute";
            c7.style.left = (spadeLeft + window.concreteOffsetX + adjustX) + "px";
            c7.style.top = (spadeTop + window.concreteOffsetY + adjustY) + "px";

            spade.style.pointerEvents = "auto";
            triggerArrow("arrow7Img");
            changeStep(18); 
        }, 900);
    }
    else if (step === 18) {
        let arrow7 = document.getElementById("arrow7Img");
        let c7 = document.getElementById("concrete7Img");
        let c7Final = document.getElementById("concreteFinal7Img");
        spade.style.pointerEvents = "none";
        arrow7.style.opacity = 0;
        arrow7.style.animation = "none";

        let spadeLeft = parseFloat(spade.style.left) || spade.offsetLeft;
        let spadeTop = parseFloat(spade.style.top) || spade.offsetTop;
        let adjustX = 40; let adjustY = 40; 
        c7.style.left = (spadeLeft + window.concreteOffsetX + adjustX) + "px";
        c7.style.top = (spadeTop + window.concreteOffsetY + adjustY) + "px";
        spade.style.transform = "translate(0,0)";
        c7.style.transform = "translate(0,0)";

        setTimeout(() => {
            spade.style.transition = "transform 0.7s ease-out";
            c7.style.transition    = "transform 0.7s ease-out";
            spade.style.transform = "translate(0, -320px)";
            c7.style.transform    = "translate(0, -320px)";
        }, 50);

        setTimeout(() => {
            spade.style.transform = "translate(-250px, -320px)";
            c7.style.transform    = "translate(-250px, -320px)";
        }, 850);

        setTimeout(() => {
            c7.style.transition = "transform 0.6s ease-out";
            c7.style.transform = "translate(-250px, -50px)";
        }, 1600);

        setTimeout(() => {
            c7.style.opacity = 0;
            c7.style.display = "none";
            let c6Final = document.getElementById("concreteFinal6Img");
            if(c6Final) { c6Final.style.opacity = 0; c6Final.style.display = "none"; }
            c7Final.style.display = "block";
            c7Final.style.visibility = "visible";
            setTimeout(() => c7Final.style.opacity = 1, 50);

             // --- POINTER UPDATE (Weight Increase) ---
             pointer.style.transition = "transform 0.5s ease-out";
             pointer.style.transform = "translate(-50%, -50%) rotate(24deg)";

        }, 2200);

        setTimeout(() => {
            spade.style.transition = "transform 0.6s ease-out";
            spade.style.transform = "translate(0, -320px)";
        }, 2300);

        setTimeout(() => {
            spade.style.transform = "translate(0, 0)";
            spade.style.pointerEvents = "auto";
            changeStep(19); 
            unlockNextBtn();
        }, 3000);
    }
    else if (step === 21) {
        let arrow9 = document.getElementById("arrow9Img");
        let c9 = document.getElementById("concrete9Img");
        spade.style.pointerEvents = "none";
        arrow9.style.opacity = 0;
        arrow9.style.animation = "none";
        spade.style.animation = "shakeSpade3 0.9s ease-in-out";

        setTimeout(() => {
            spade.style.animation = "none";
            let spadeLeft = parseFloat(spade.style.left) || spade.offsetLeft;
            let spadeTop = parseFloat(spade.style.top) || spade.offsetTop;
            let adjustX = 40; let adjustY = 40; 
            c9.style.display = "block";
            c9.style.opacity = 1;
            c9.style.position = "absolute";
            c9.style.left = (spadeLeft + window.concreteOffsetX + adjustX) + "px";
            c9.style.top = (spadeTop + window.concreteOffsetY + adjustY) + "px";
            spade.style.pointerEvents = "auto";
            triggerArrow("arrow9Img");
            changeStep(22); 
        }, 900);
    }
    else if (step === 22) {
        let arrow9 = document.getElementById("arrow9Img");
        let c9 = document.getElementById("concrete9Img");
        let c9Final = document.getElementById("concreteFinal9Img");
        spade.style.pointerEvents = "none";
        arrow9.style.opacity = 0;
        arrow9.style.animation = "none";

        let spadeLeft = parseFloat(spade.style.left) || spade.offsetLeft;
        let spadeTop = parseFloat(spade.style.top) || spade.offsetTop;
        let adjustX = 40; let adjustY = 40;
        c9.style.left = (spadeLeft + window.concreteOffsetX + adjustX) + "px";
        c9.style.top = (spadeTop + window.concreteOffsetY + adjustY) + "px";
        spade.style.transform = "translate(0,0)";
        c9.style.transform = "translate(0,0)";

        setTimeout(() => {
            spade.style.transition = "transform 0.7s ease-out";
            c9.style.transition    = "transform 0.7s ease-out";
            spade.style.transform = "translate(0, -320px)";
            c9.style.transform    = "translate(0, -320px)";
        }, 50);

        setTimeout(() => {
            spade.style.transform = "translate(-250px, -320px)";
            c9.style.transform    = "translate(-250px, -320px)";
        }, 850);

        setTimeout(() => {
            c9.style.transition = "transform 0.6s ease-out";
            c9.style.transform = "translate(-250px, -50px)";
        }, 1600);

        setTimeout(() => {
            c9.style.opacity = 0;
            c9.style.display = "none";
            let c8Final = document.getElementById("concreteFinal8Img");
            if (c8Final) { c8Final.style.opacity = 0; c8Final.style.display = "none"; }
            c9Final.style.display = "block";
            c9Final.style.visibility = "visible";
            setTimeout(() => c9Final.style.opacity = 1, 50);

             // --- POINTER UPDATE (Weight Increase) ---
             pointer.style.transition = "transform 0.5s ease-out";
             pointer.style.transform = "translate(-50%, -50%) rotate(36deg)";

        }, 2200);

        setTimeout(() => {
            spade.style.transition = "transform 0.6s ease-out";
            spade.style.transform = "translate(0, -320px)";
        }, 2300);

        setTimeout(() => {
            spade.style.transform = "translate(0, 0)";
            spade.style.pointerEvents = "auto";
            changeStep(23); 
            unlockNextBtn();
        }, 3000);
    }
    else if (step === 25) {
        let arrow10 = document.getElementById("arrow10Img");
        let c11 = document.getElementById("concrete11Img");
        spade.style.pointerEvents = "none";
        arrow10.style.opacity = 0;
        arrow10.style.animation = "none";
        spade.style.animation = "shakeSpade3 0.9s ease-in-out";

        setTimeout(() => {
            spade.style.animation = "none";
            let spadeLeft = parseFloat(spade.style.left) || spade.offsetLeft;
            let spadeTop = parseFloat(spade.style.top) || spade.offsetTop;
            let adjustX = 40; let adjustY = 40; 
            c11.style.display = "block";
            c11.style.opacity = 1;
            c11.style.position = "absolute";
            c11.style.left = (spadeLeft + window.concreteOffsetX + adjustX) + "px";
            c11.style.top = (spadeTop + window.concreteOffsetY + adjustY) + "px";
            spade.style.pointerEvents = "auto";
            triggerArrow("arrow10Img");
            changeStep(26); 
        }, 900);
    }
    else if (step === 26) {
        let arrow10 = document.getElementById("arrow10Img");
        let c11 = document.getElementById("concrete11Img");
        let c11Final = document.getElementById("concreteFinal11Img");
        spade.style.pointerEvents = "none";
        arrow10.style.opacity = 0;
        arrow10.style.animation = "none";

        let spadeLeft = parseFloat(spade.style.left) || spade.offsetLeft;
        let spadeTop = parseFloat(spade.style.top) || spade.offsetTop;
        let adjustX = 40; let adjustY = 40; 
        c11.style.left = (spadeLeft + window.concreteOffsetX + adjustX) + "px";
        c11.style.top  = (spadeTop  + window.concreteOffsetY + adjustY) + "px";
        spade.style.transform = "translate(0,0)";
        c11.style.transform = "translate(0,0)";

        setTimeout(() => {
            spade.style.transition = "transform 0.7s ease-out";
            c11.style.transition   = "transform 0.7s ease-out";
            spade.style.transform = "translate(0, -320px)";
            c11.style.transform   = "translate(0, -320px)";
        }, 50);

        setTimeout(() => {
            spade.style.transform = "translate(-250px, -320px)";
            c11.style.transform   = "translate(-250px, -320px)";
        }, 850);

        setTimeout(() => {
            c11.style.transition = "transform 0.6s ease-out";
            c11.style.transform = "translate(-250px, -50px)";
        }, 1600);

        setTimeout(() => {
            c11.style.opacity = 0;
            c11.style.display = "none";
            let c10Final = document.getElementById("concreteFinal10Img");
            if(c10Final) { c10Final.style.opacity = 0; c10Final.style.display = "none"; }
            c11Final.style.display = "block";
            c11Final.style.visibility = "visible";
            setTimeout(() => c11Final.style.opacity = 1, 50);

             // --- POINTER UPDATE (Weight Increase) ---
             pointer.style.transition = "transform 0.5s ease-out";
             pointer.style.transform = "translate(-50%, -50%) rotate(42deg)";

        }, 2200);

        setTimeout(() => {
            spade.style.transition = "transform 0.6s ease-out";
            spade.style.transform = "translate(0, -320px)";
        }, 2300);

        setTimeout(() => {
            spade.style.transform = "translate(0, 0)";
            spade.style.pointerEvents = "auto";
            changeStep(27); 
            unlockNextBtn();
        }, 3000);
    }
});


document.getElementById("trapImg").addEventListener("click", () => {
    if (step !== 8) return;
    let trap = document.getElementById("trapImg");
    let finalC2 = document.getElementById("concreteFinal2Img");
    let concrete3 = document.getElementById("concrete3Img");
    let arrowLeft = document.getElementById("arrowLeftImg");
    let concrete3Final = document.getElementById("concrete3FinalImg");

    arrowLeft.style.opacity = 0;
    arrowLeft.style.animation = "none";
    trap.style.pointerEvents = "none";
    trap.style.animation = "slideTrapRight 0.7s ease-out forwards";
    finalC2.style.opacity = 0;
    concrete3.style.display = "block";
    concrete3.style.opacity = 1;
    concrete3.style.animation = "dropConcrete3 1s ease-out forwards";

    setTimeout(() => {
        concrete3.style.opacity = 0;
        concrete3Final.style.opacity = 1;
    }, 1000);

    changeStep(9); // UPDATE INSTRUCTION
    setTimeout(() => {
        let arrowLeft2 = document.getElementById("arrowLeft2Img");
        arrowLeft2.style.opacity = 1;
        arrowLeft2.style.animation = "blinkArrowLeft 1.1s infinite ease-in-out";
    }, 1200);
});

document.getElementById("trap1Img").addEventListener("click", () => {
    if (step !== 9) return;
    let trap1 = document.getElementById("trap1Img");
    let arrow2 = document.getElementById("arrowLeft2Img");
    let c3Final = document.getElementById("concrete3FinalImg");
    let c4Piece = document.getElementById("concrete4Img");
    let c4Final = document.getElementById("concrete4FinalImg");

    arrow2.style.opacity = 0;
    arrow2.style.animation = "none";
    trap1.style.pointerEvents = "none";
    trap1.style.animation = "slideTrapRight 0.7s ease-out forwards";
    c3Final.style.opacity = 0;
    c4Piece.style.display = "block";
    c4Piece.style.opacity = 1;
    c4Piece.style.animation = "dropConcrete4 1s ease-out forwards";

    setTimeout(() => {
        c4Piece.style.opacity = 0;
        c4Final.style.opacity = 1;
        changeStep(10); // UPDATE INSTRUCTION
        unlockNextBtn();
    }, 1000);
});

document.getElementById("cylinderImg").addEventListener("click", () => {
    if (step === 10) {
        let arrowLeft = document.getElementById("arrowLeftImg"); 
        let cylinder = document.getElementById("cylinderImg");
        arrowLeft.style.opacity = 0;
        arrowLeft.style.animation = "none";
        cylinder.style.pointerEvents = "none";
        startCylinderMovement();
    }
});


document.getElementById("levelerImg").addEventListener("click", () => {
    
    if (![15, 19, 23, 27].includes(step)) return;

    let leveler = document.getElementById("levelerImg");
    let arrow = document.getElementById("arrowImg");
    let nextBtn = document.getElementById("nextBtn");

    arrow.style.opacity = 0;
    arrow.style.animation = "none";
    leveler.style.pointerEvents = "none";
    nextBtn.style.animation = "none";       
    nextBtn.style.opacity = 0.5;            
    nextBtn.style.pointerEvents = "none";   

    let targetTop = "64%"; 
    if (step === 15) targetTop = "64%";  
    if (step === 19) targetTop = "58%";  
    if (step === 23) targetTop = "52%";  
    if (step === 27) targetTop = "46%";  

    leveler.style.transition = "top 1s ease-out, left 1s ease-out";
    leveler.style.left = "calc(46.64% - 100px)"; 
    leveler.style.top = `calc(${targetTop} - 100px)`; 

    setTimeout(() => {
        leveler.style.transition = "none";
        leveler.style.animation = "levelerShakeRelative 0.5s linear 25"; 
        let duration = 25 * 500; 

        let swapData = {};
        if (step === 15) swapData = { old: "concreteFinal5Img", new: "concreteFinal6Img", nextStep: 16 };
        if (step === 19) swapData = { old: "concreteFinal7Img", new: "concreteFinal8Img", nextStep: 20 };
        if (step === 23) swapData = { old: "concreteFinal9Img", new: "concreteFinal10Img", nextStep: 24 };
        if (step === 27) swapData = { old: "concreteFinal11Img", new: "concreteFinal12Img", nextStep: 28 };

        setTimeout(() => {
            let oldC = document.getElementById(swapData.old);
            if(oldC) { oldC.style.opacity = 0; oldC.style.display = "none"; }

            let newC = document.getElementById(swapData.new);
            if(newC) {
                newC.style.display = "block";
                newC.style.visibility = "visible";
                setTimeout(() => newC.style.opacity = 1, 50);
            }

            leveler.style.opacity = 0;
            leveler.style.display = "none"; 

            changeStep(swapData.nextStep); // UPDATE INSTRUCTION
            unlockNextBtn(); 

        }, duration);
    }, 1000); 
});

function setupLeveler() {
    let leveler = document.getElementById("levelerImg");
    let arrow = document.getElementById("arrowImg");
    let nextBtn = document.getElementById("nextBtn");

    // 1. Show Leveler
    leveler.style.display = "block";
    leveler.style.opacity = 1;
    
    // Position Leveler (Waiting Position)
    leveler.style.left = "30%";  
    leveler.style.top = "35%";
    leveler.style.transform = "rotate(90deg)"; 
    leveler.style.animation = "none";          
    leveler.style.cursor = "pointer";
    leveler.style.pointerEvents = "auto";

    // 2. SHOW ARROW (JS controls visibility, CSS controls position)
    // We reset opacity first to ensure the blinking animation restarts
    arrow.style.opacity = 0; 
    arrow.style.display = "block";
    arrow.style.zIndex = "9999"; 
    
    setTimeout(() => {
        arrow.style.opacity = 1;
        arrow.style.animation = "blinkArrow 1.1s infinite ease-in-out";
    }, 100);

    // 3. Disable Next Button
    nextBtn.style.opacity = 0.5;
    nextBtn.style.pointerEvents = "none";
}

function openInputModal(type) {
    currentInputType = type;
    const modal = document.getElementById('inputModal');
    const label = document.getElementById('inputLabel');
    const input = document.getElementById('weightInput');
    
    input.value = ""; // Clear previous
    modal.style.display = "flex";

    // --- CASE 0: W (Empty Cylinder) ---
    if (type === 'w') {
        label.innerText = "Note down W (Empty Cylinder):";
        input.placeholder = "kg";
    }
    // --- CASE 1: W1 ---
    else if (type === 'w1') {
        label.innerText = "Note down W1 (Partially Compacted Concrete):";
        input.placeholder = "kg";
    } 
    // --- CASE 2: W2 ---
    else if (type === 'w2') {
        label.innerText = "Note down W2 (Fully Compacted Concrete):";
        input.placeholder = "kg";
    } 
    // --- CASE 3: COMPACTION FACTOR (Formula + Solution + Input) ---
    else if (type === 'cf') {
        let w1 = parseFloat(w1Value);
        let w2 = parseFloat(w2Value);
        let w = 10; // Empty cylinder weight

        // We inject HTML to show the Formula and the Substitution (Solution steps)
        label.innerHTML = `
            <div style="text-align:left; font-size:14px; line-height:1.5; color:#333;">
                <b>Formula:</b> <br>
                C.F. = (W<sub>1</sub> - W) / (W<sub>2</sub> - W) <br>
                <hr style="margin:8px 0; border-color:#ccc;">
                <b>Values:</b> <br>
                W<sub>1</sub> = ${w1} kg,<br>W<sub>2</sub> = ${w2} kg, W = ${w} kg <br>
                <hr style="margin:8px 0; border-color:#ccc;">
                <b>Solution:</b> <br>
                C.F. = (${w1} - ${w}) / (${w2} - ${w}) <br>
                C.F. = ${(w1-w).toFixed(1)} / ${(w2-w).toFixed(1)} = 0.71
            </div>
            <br>
            <b>Enter Compaction Factor:</b>
        `;
        input.placeholder = "Enter result (e.g. 0.71)";
    }
}

function submitWeight() {
    const input = document.getElementById('weightInput');
    const val = input.value;
    
    if (!val) { alert("Please enter a value"); return; }
    
    // --- CASE 0: W SUBMISSION ---
    if (currentInputType === 'w') {
        // Just close and move forward. We don't store 'val' because you said not to use it.
        document.getElementById('inputModal').style.display = "none";
        document.getElementById('weightValueText').style.opacity = 0;
        
        // Trigger the next instruction manually
        changeStep(12);
        unlockNextBtn();
    }
    // --- CASE 1: W1 SUBMISSION ---
    else if (currentInputType === 'w1') {
        w1Value = val;
        document.getElementById('inputModal').style.display = "none";
        document.getElementById('weightValueText').style.opacity = 0;
        
        changeStep(11); 
        unlockNextBtn();
    } 
    // --- CASE 2: W2 SUBMISSION ---
    else if (currentInputType === 'w2') {
        w2Value = val;
        document.getElementById('inputModal').style.display = "none";

        let valText = document.getElementById("weightValueText");
        valText.innerText = "W2 = " + w2Value + " kg"; 
        valText.style.opacity = 1;     

        setTimeout(() => {
            openInputModal('cf');
        }, 1000);
    } 
    // --- CASE 3: COMPACTION FACTOR SUBMISSION ---
    else if (currentInputType === 'cf') {
        document.getElementById('inputModal').style.display = "none";
        document.getElementById("weightValueText").style.opacity = 0;
        
        showFinalResults(val);
    }
}

function showFinalResults(userCF) {
    document.getElementById("inputModal").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("weightValueText").style.opacity = 0;

    // 2. Reset the Instruction Box to default (remove green window styles)
    const box = document.getElementById('instructionBox');
    box.style.left = "";       
    box.style.top = "";        
    box.style.transform = "";  
    box.style.width = "";      
    box.style.textAlign = ""; 
    box.style.background = ""; 
    box.style.color = "";      
    box.style.border = "";     

    // 3. Clear manual HTML so the CSS ::after text works correctly
    box.innerHTML = ""; 

    // 4. Trigger Step 29 (Display "Test Completed" in yellow box)
    changeStep(29);
}
