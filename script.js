emailjs.init("4OK96nwd-J9z4006A");

function submitRSVP() {
  const today = new Date();
  const deadline = new Date(2025, 3, 4);
  deadline.setHours(0, 0, 0, 0);

  if (today >= deadline) {
    alert("Die Frist für die Rückmeldung ist leider schon abgelaufen!😔 Bitte melde dich persönlich bei mir.");
    return;
  }

  const nameInput = document.getElementById('name').value.trim();
  const answerInput = document.getElementById('answer').value;

  if (!nameInput) {
    alert('Bitte gib Deinen Namen ein.');
    return;
  }

  let attendanceText = [];

  if (document.getElementById("alleine").checked) {
    attendanceText.push("Alleine");
  } else {
    if (document.getElementById("kind").checked) {
      const childrenCount = document.getElementById("children_count").value.trim();
      if (childrenCount) {
        attendanceText.push(`Mit Kind(ern) (${childrenCount} Kind(er))`);
      } else {
        attendanceText.push("Mit Kind(ern)");
      }
    }

    if (document.getElementById("partner").checked) {
      attendanceText.push("Mit Partner/-in");
    }

    if (document.getElementById("sonstiges").checked) {
      const otherDetails = document.getElementById("other_details").value.trim();
      if (otherDetails) {
        attendanceText.push(`Sonstiges: ${otherDetails}`);
      }
    }
  }

  emailjs.send("service_4elkfr9", "template_ffgdj3s", {
    name: nameInput,
    answer: answerInput === "yes" ? "Zusage" : "Absage",
    attendance: attendanceText.join(", ")
  }).then(() => {
    alert("Danke für die Rückmeldung! Liebe Grüße Melanie 🩷");
  }).catch(error => {
    console.error("Fehler beim Versenden", error);
  });
}

function toggleInputs() {
  const isAlone = document.getElementById("alleine").checked;

  if (isAlone) {
    document.getElementById("kind").disabled = true;
    document.getElementById("kind").checked = false;
    document.getElementById("children_count").disabled = true;
    document.getElementById("children_count").value = "";

    document.getElementById("partner").disabled = true;
    document.getElementById("partner").checked = false;

    document.getElementById("sonstiges").disabled = true;
    document.getElementById("sonstiges").checked = false;
    document.getElementById("other_details").disabled = true;
    document.getElementById("other_details").value = "";
  } else {
    document.getElementById("kind").disabled = false;
    document.getElementById("partner").disabled = false;
    document.getElementById("sonstiges").disabled = false;

    if (document.getElementById("kind").checked) {
      document.getElementById("children_count").disabled = false;
    } else {
      document.getElementById("children_count").disabled = true;
      document.getElementById("children_count").value = "";
    }

    if (document.getElementById("sonstiges").checked) {
      document.getElementById("other_details").disabled = false;
    } else {
      document.getElementById("other_details").disabled = true;
      document.getElementById("other_details").value = "";
    }
  }
}