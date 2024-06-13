const profileForm = document.getElementById('profileForm');
const usernameInput = document.getElementById('usernameInput');
const profileInfo = document.getElementById('profileInfo');
const repositories = document.getElementById('repositories');

profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const apiUrl = `https://api.github.com/users/${username}`;
  const reposUrl = `https://api.github.com/users/${username}/repos`;

  try {
    const profileResponse = await fetch(apiUrl);
    const reposResponse = await fetch(reposUrl);

    if (!profileResponse.ok) {
      throw new Error('User not found');
    }

    const profileData = await profileResponse.json();
    const reposData = await reposResponse.json();

    // Display profile information
    profileInfo.innerHTML = `
      <h2>${profileData.login}</h2>
      <p>Name: ${profileData.name}</p>
      <p>Location: ${profileData.location}</p>
      <p>Followers: ${profileData.followers}</p>
      <p>Following: ${profileData.following}</p>
    `;

    // Display repositories
    repositories.innerHTML = `
      <h3>Repositories:</h3>
      <ul>
        ${reposData.map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join('')}
      </ul>
    `;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    profileInfo.innerHTML = `<p>${error.message}</p>`;
    repositories.innerHTML = '';
  }
});
