const baseScore = 1;

function isExplosion(hanAmount) {
    if (hanAmount == 10) {
        return hanAmount *= 2;
    }
    else {
        return hanAmount;
    }
}

function showManualInputForm() {
    const form = document.getElementById("manualInputForm");

    if (form.style.display === "none") {
        form.style.display = "block"
    }
    else {
        form.style.display = "none"
    }
}

document.getElementById("winDetailsForm").addEventListener("submit", event => {
    event.preventDefault();
    const submittedData = new FormData(winDetailsForm);

    const winner = submittedData.get("winner");
    const loser = submittedData.get("loser");
    const han = isExplosion(submittedData.get("han"));
    const playerFey = {"P1":submittedData.get("feyAmount1"),"P2":submittedData.get("feyAmount2"),"P3":submittedData.get("feyAmount3")};
    function feyScoreManipulation(player) {
        let scoreManipulation = 0;
        for (const item in playerFey) {
            if (player == winner) {
                if (item != player) {
                    scoreManipulation += playerFey[player] - playerFey[item];
                }
            }
            else {
                if (item == winner) {
                    scoreManipulation += playerFey[item] - playerFey[player];
                }
            }
        }
        return scoreManipulation * baseScore * 2;
    }

    if (winner == loser) {
        document.getElementById(winner).innerHTML = Number(document.getElementById(winner).innerHTML) + (han * 2 * baseScore * 2 + feyScoreManipulation(winner));
        
        for (let item of ["P1", "P2", "P3"]) {
            if (item != winner) {
                document.getElementById(item).innerHTML = Number(document.getElementById(item).innerHTML) - (han * 2 * baseScore + feyScoreManipulation(item));
            }
        }
    }
    else if (winner != loser) {
        document.getElementById(winner).innerHTML = Number(document.getElementById(winner).innerHTML) + (han * 2 * baseScore * 1.5 + feyScoreManipulation(winner));

        for (let item of ["P1", "P2", "P3"]) {
            if (![winner, loser].includes(item)) {
                document.getElementById(item).innerHTML = Number(document.getElementById(item).innerHTML) - (han * 2 * baseScore / 2 + feyScoreManipulation(item));
            }
            else if (item == loser) {
                document.getElementById(item).innerHTML = Number(document.getElementById(item).innerHTML) - (han * 2 * baseScore + feyScoreManipulation(item));
            }
        }
    }
    document.getElementById("winDetailsForm").reset()
});

document.getElementById("manualInputForm").addEventListener("submit", event => {
    event.preventDefault();
    const submittedData = new FormData(manualInputForm);

    document.getElementById("P1").innerHTML = Number(document.getElementById("P1").innerHTML) + Number(submittedData.get("P1Score"));
    document.getElementById("P2").innerHTML = Number(document.getElementById("P2").innerHTML) + Number(submittedData.get("P2Score"));
    document.getElementById("P3").innerHTML = Number(document.getElementById("P3").innerHTML) + Number(submittedData.get("P3Score"));
})

for (const customradio of document.getElementsByClassName("customradio")) {
	customradio.addEventListener("click", event => {
		for (button of document.getElementsByClassName("customradio")) {
			if (button.firstElementChild.firstElementChild.checked == true) {
				button.style.backgroundColor = "#1a66ff"
			}
			else {
				button.style.backgroundColor = "#6699ff"
			}
		}
	})
}