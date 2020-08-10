const baseUrl = 'http://localhost:3000'

let tempSong = []

$( document ).ready(function() {
  // tanda bahwa user sudah login adalah ada token di localStoragenya
  checkAuth()
})

function checkAuth () {
  if (localStorage.getItem('token')) {
    $('#login-page').hide()
    $('#search-music').show()
    $('#addmusic-page').hide()
    $('#home-page').show()
    $('#error').hide()
    fetchMusic()
  } else {
    $('#login-page').show()
    $('#addmusic-page').hide()
    $('#search-music').hide()
    $('#home-page').hide()
    $('#error').hide()
  }
}

function login (event) {
  event.preventDefault()
  var email = $('#login-email').val()
  var password = $('#login-password').val()

  $.ajax({
    url: `${baseUrl}/users/login`,
    method: 'post',
    data: {
      email: email,
      password: password
    }
  })
    .done(response => {
      console.log(response)
      localStorage.setItem('token', response.token)

      // setelah berhasil login, perlu check auth lagi
      checkAuth()
    })
    .fail(err => {
      console.log(err.responseJSON.errors.join(','),'>>>>>>>>errrr')
      $('#error').show()
      $('#error').empty()
      $('#error').append(`
        <p>${err.responseJSON.errors.join(',')}</p>
      `)
      setTimeout(() => {
        $('#error').hide()
      }, 3000);
    })
}

function logout () {
  const auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
      console.log('User signed out.')
  });
  localStorage.clear()
  checkAuth()
}

function fetchMusic () {
  // kamu show si komponen loading
  $.ajax({
    url: `${baseUrl}/musics`,
    method: 'get',
    headers: {
      token: localStorage.token
    }
  })
    .done(response => {
      // di tutup di hide si loading
      console.log(response)
      $('#container-music').empty()
      response.musics.forEach(song => {
        let template = `<li class="media bg-white rounded p-2 shadow mt-3">
          <img src="${song.image}" class="mr-3 rounded" alt="cover" width="100">
          <div class="media-body p-1">
            <button type="button" class="close float-right" aria-label="Close" onclick="deleteMusic(${song.id})">
              <span aria-hidden="true">&times;</span>
            </button>
            <a href="#" class="badge badge-warning text-uppercase" style="letter-spacing: 1px;">${song.genre}</a>
            <a href="google.com" class="text-decoration-none" target="_blank">
              <h5 class="mt-0 mb-0">${song.title}</h5>
            </a>
            <div class="d-flex align-items-center mt-2">
              <span class="text-muted mb-1">${song.artist}</span> 
              <audio controls style="margin: 0 0 0 5px; width:300px;height:25px;"">
                <source src="${song.preview}" type="audio/ogg">
                <source src="${song.preview}" type="audio/mpeg">
              Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </li>`

        $('#container-music').append(template)
      })
    })
    .fail(err => {
      // di hide loading tampilin erorr
      console.log(err)
    })
}

function findSongApi (event) {
  event.preventDefault()
  let title = $('#song-title').val()
  $.ajax({
    url: `${baseUrl}/search-song/${title}`,
    method: 'get',
    headers: {
      token: localStorage.token
    }
  })
    .done(data => {
      tempSong = data.songs.data
      console.log(data,' .>>>>>>>>> data')
      $('#song-api-list').empty()
      data.songs.data.forEach((song, i)=> {
        let template = `
        <li class="media bg-white rounded p-2 my-3 mx-2" style="width:420px">
          <img src="${song.album.cover}" class="mr-3 rounded" alt="cover" width="100">
          <button type="button" class="close float-right" aria-label="Close">
                <span aria-hidden="true" onclick="addSongApi('${i}')">+</span>
              </button>
          <div class="media-body p-1">
            <a href="#" class="badge badge-warning text-uppercase" style="letter-spacing: 1px;">Pop</a>
            <h5 class="mt-0 mb-0">${song.title}</h5>
            <div class="d-flex align-items-center mt-2">
              <span class="text-muted mb-1">${song.artist.name}</span> 
              <audio controls style="margin: 0 0 0 5px; width:100px;height:25px;"">
                <source src="${song.preview}" type="audio/ogg">
                <source src="${song.preview}" type="audio/mpeg">
              Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </li>
        `
        $('#song-api-list').append(template)
        $('#song-title').val('')
      })
    })
    .fail(err => {
      console.log(err, 'errro')
    })
}


function toAddMusicPage () {
  $('#login-page').hide()
  $('#addmusic-page').show()
  $('#home-page').hide()
  $('#search-music').hide()
}

function addSongApi(i) {
  console.log(tempSong[i],'->>>>>>>')
  toAddMusicPage()
  $('#add-title').val(tempSong[i].title)
  $('#add-artist').val(tempSong[i].artist.name)
  $('#add-image').val(tempSong[i].album.cover)
  $('#add-preview').val(tempSong[i].preview)
}

function addMusic (event) {
  event.preventDefault()
  const title = $('#add-title').val()
  const artist = $('#add-artist').val()
  const genre = $('#add-genre').val()
  const image = $('#add-image').val()
  const preview = $('#add-preview').val()

  $.ajax({
    url: `${baseUrl}/musics`,
    method: 'post',
    data: {
      title,
      artist,
      genre,
      image,
      preview
    },
    headers: {
      token: localStorage.token
    }
  })
    .done(() => {
      checkAuth()
    })
    .fail(err => {
      console.log(err, 'errrrrorr>>>>>>>>>>>>>>>>>>>>>.')
      console.log(err.responseJSON.errors.join(','),'>>>>>>>>errrr')
      $('#error').show()
      $('#error').empty()
      $('#error').append(`
        <p>${err.responseJSON.errors.join(',')}</p>
      `)
      setTimeout(() => {
        $('#error').hide()
      }, 3000);
    })
    .always(() => {
      $('#add-title').val('')
      $('#add-artist').val('')
      $('#add-genre').val('')
      $('#add-image').val('')
      $('#add-preview').val('')
    })
}

function deleteMusic (id) {
  $.ajax({
    url: `${baseUrl}/musics/${id}`,
    method: 'delete',
    headers: {
      token: localStorage.token
    }
  })
    .done(() => {
      checkAuth()
    })
    .fail(err => {
      console.log(err)
    })
}

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token

  $.ajax({
    url: baseUrl + '/users/googleSignIn',
    method: 'post',
    data: {
      id_token
    }
  })
    .done(data => {
      console.log(data.token, 'dataaa')
      localStorage.setItem('token', data.token)
      checkAuth()
    })
    .fail(err => {
      console.log(err, 'errorr')
    })
}