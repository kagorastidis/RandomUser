
$(document).ready(function () {
    _setCoverImg('.card-img-wrapper', 'https://unsplash.it/400/200?random');
    _getRandomUser('https://randomuser.me/api/');
    _changeBgColor(_randColor(0, 255), _randColor(0, 255), _randColor(0, 255), opacity = Math.random());
    _refresh('#refresh');
});

var _randColor = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var _changeBgColor = function (r, g, b, opacity) {
    var color = "rgba(" + r + "," + b + "," + g + "," + opacity + ")";
    $('body').css({'background': color});
}

var _changeCoverImg = function () {
    var url = 'https://unsplash.it/400/200?image=' + _randColor(0, 1084);
    _setCoverImg('.card-img-wrapper', 'img/loading.gif');
    //unsplash it sometimes returns 404 thus the url check.
    axios.get(url)
        .then(function (response) {
            _setCoverImg('.card-img-wrapper', url);
        })
        .catch(function (error) {
            if(error.response) {
                _changeCoverImg(url);
            }
        });
}

var _setCoverImg = function (selector, url) {
    $(selector).css('background-image', 'url(' + url + ')');
}

var _getRandomUser = function (url) {
    //https://randomuser.me/api/
    $('#profile-img').attr('src', 'img/loading-thumb.gif')
    axios.get(url)
        .then(function (response) {
            var dataObj = response.data.results[0];
            var userArgs = {
                'avatar': dataObj.picture.large,
                'name': dataObj.name.first + " "+ dataObj.name.last,
                'gender': dataObj.gender,
                'location': dataObj.location.state + "," + dataObj.location.city + ", " + dataObj.location.postcode + ", " + dataObj.location.street,
                'phone': dataObj.cell,
                'email': dataObj.email
            }
            _setData(userArgs.avatar, userArgs.name, userArgs.gender, userArgs.location, userArgs.phone, userArgs.email);
        })
        .catch(function (error) {
            if (error.response) {
                _getRandomUser(url);
            }
        });
}

var _setData = function (avatar, name, gender, location, phone, email) {
    $('#profile-img').attr('src', avatar);
    $('#name').text(name);
    $('#gender').text(gender);
    $('#location').text(location);
    $('#phone').text(phone);
    $('#email').text(email);
}

var _refresh = function (trigger) {
    $(trigger).on('click', function(e) {
        _changeCoverImg();
        _getRandomUser('https://randomuser.me/api/');
        _changeBgColor(_randColor(0, 255), _randColor(0, 255), _randColor(0, 255), opacity = Math.random());
    })
}