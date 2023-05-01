function getAddedLinks() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['addedLinks'], (result) => {
      if (result.addedLinks) {
        resolve(JSON.parse(result.addedLinks));
      } else {
        const defaultLinks = [
          ["Schedule", "/html/clockPage.html", "/images/clock.png"],
          ["Gmail", "https://mail.google.com/mail/u/0/#inbox", "/images/gmail.png"],
          ["Classroom", "https://classroom.google.com/", "/images/classroom.png"],
          ["Drive", "https://drive.google.com/drive/u/0/", "/images/drive.png"],
          ["EHHS", "https://www.easthamptonschools.org/highschool", "/images/bonac.png"],
          ["SchoolTool", "https://easthamptonst.esboces.org/schooltoolweb/", "/images/schoolTool.png"],
          ["EH Tech Support", "https://ehschools.mojohelpdesk.com/", "/images/support.png"],
          ["Virtual Bulletin", "https://docs.google.com/presentation/d/1T-idGOxDysnA_qrA0ilTapPdZNXiYt-09Ew1kL1AUbk/preview?slide=id.gb047d9a6b6_0_28", "/images/announcement.png"],
          ["Bonac Beachcomber", "https://bonacbeachcomber.com/", "/images/newspaper.png"],
          ["Khan Academy", "https://www.khanacademy.org/", "/images/khanAcademy.png"],
          ["Castle Learning", "https://cl.castlelearning.com/Review/CLO/Account/LogOn", "/images/castleLearning.png"],
          ["AP Classroom", "https://apstudents.collegeboard.org/", "/images/collegeBoard.png"],
        ];
        resolve(defaultLinks);
      }
      console.log(result.addedLinks);
    });
  });
}

async function setRowHolder() {
  return new Promise((resolve) => {
    chrome.storage.sync.get('sliderValue', (data) => {
      const rowHolder = data.sliderValue ? parseInt(data.sliderValue) : 3;
      console.log('rowHolder:', rowHolder); // Log the rowHolder value
      resolve(rowHolder);
    });
  });
}


async function setTitleText(rowHolder) {
  console.log('rowHolder:', rowHolder); // Log the rowHolder value
  var root = document.documentElement;
  if (rowHolder === 1) {
    root.style.setProperty('--link-container-width', '90px');
    root.style.setProperty('--title-row-container-width', '50px');
    document.getElementById("titleText").innerHTML = "";
    document.getElementById("feedbackText").innerHTML = "FB?";
  } else if (rowHolder === 2) {
    root.style.setProperty('--link-container-width', '180px');
    root.style.setProperty('--title-row-container-width', '140px');
    document.getElementById("titleText").innerHTML = "HS";
    document.getElementById("feedbackText").innerHTML = "Feedback?";
  } else if (rowHolder === 3) {
    root.style.setProperty('--link-container-width', '270px');
    root.style.setProperty('--title-row-container-width', '230px');
    document.getElementById("titleText").innerHTML = "HIGH SCHOOL";
    document.getElementById("feedbackText").innerHTML = "Have feedback?";
  } else if (rowHolder === 4) {
    root.style.setProperty('--link-container-width', '360px');
    root.style.setProperty('--title-row-container-width', '320px');
    document.getElementById("titleText").innerHTML = "HIGH SCHOOL";
    document.getElementById("feedbackText").innerHTML = "Have feedback? Click here!";
  }else if(rowHolder === 5){
    root.style.setProperty('--link-container-width', '450px');
    root.style.setProperty('--title-row-container-width', '410px');
    document.getElementById("titleText").innerHTML = "HIGH SCHOOL";
    document.getElementById("feedbackText").innerHTML = "Have feedback? Click here!";
  }
}
async function addLinks() {
  const addedLinks = await getAddedLinks();
  const linkRow = document.querySelector('.placeHolder');
  let linkCount = 0;
  let row = document.createElement('div');
  row.classList.add('linkRow');

  const rowHolder = await setRowHolder();

  addedLinks.forEach((link) => {
    const linkContainer = document.createElement('a');
    linkContainer.classList.add('nameText');
    linkContainer.href = link[1]; // Set href to the correct website URL
    if (link[0] !== 'Schedule') {
      linkContainer.target = '_blank';
    }

    const linkContainerBox = document.createElement('div');
    linkContainerBox.classList.add('linkContainerBox');

    const iconImage = document.createElement('img');
    iconImage.classList.add('iconImage');
    iconImage.setAttribute('src', link[2]);

    const nameContainer = document.createElement('div');
    nameContainer.classList.add('nameContainer');

    const nameText = document.createElement('p');
    nameText.classList.add('nameText');
    nameText.textContent = link[0];

    nameContainer.appendChild(nameText);
    linkContainerBox.appendChild(iconImage);
    linkContainerBox.appendChild(nameContainer);
    linkContainer.appendChild(linkContainerBox);
    row.appendChild(linkContainer);

    linkCount++;
    if (linkCount % rowHolder === 0) {
      linkRow.parentNode.appendChild(row);
      row = document.createElement('div');
      row.classList.add('linkRow');
    }
  });

  if (linkCount % rowHolder !== 0) {
    linkRow.parentNode.appendChild(row);
  }

  const feedbackContainer = document.querySelector('.feedbackContainer');
  linkRow.parentNode.insertBefore(feedbackContainer, null);
  await setTitleText(rowHolder);

}

// Call the function to add the links when the page loads
window.addEventListener('load', addLinks);
