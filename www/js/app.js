var $$ = Dom7;

var device = Framework7.getDevice();
// const ratingStars = [...document.getElementsByClassName("f7-icons")];

// function executeRating(stars) {
//   const starClassActive = "star_fill";
//   const starClassInactive = "star";
//   const starsLength = stars.length;
//   let i;
//   stars.map((star) => {
//     star.onclick = () => {
//       i = stars.indexOf(star);

//       if (star.html === starClassInactive) {
//         for (i; i >= 0; --i) stars[i].html = starClassActive;
//       } else {
//         for (i; i < starsLength; ++i) stars[i].html = starClassInactive;
//       }
//     };
//   });
// }
// executeRating(ratingStars);

var app = new Framework7({
  name: "Komiku", // App name
  theme: "auto", // Automatic theme detection
  el: "#app", // App root element

  id: "io.framework7.myapp", // App bundle ID
  // App store
  store: store,
  // App routes
  routes: routes,

  // Input settings
  input: {
    scrollIntoViewOnFocus: device.cordova && !device.electron,
    scrollIntoViewCentered: device.cordova && !device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        // Init cordova APIs (see cordova-app.js)
        cordovaApp.init(f7);
      }
      $$("#logoutK").on("click", function () {
        localStorage.removeItem("username");
        localStorage.removeItem("idUser");
        location.reload();
      });

      $$(document).on("page:init", function (e, page) {
        if (page.name == "login") {
          localStorage.removeItem("username");
          localStorage.removeItem("idUser");

          $$("#btnsignin").on("click", function () {
            app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/loginKomik.php", { username: $$("#username").val(), password: $$("#password").val() }, function (data) {
              var arr = JSON.parse(data);
              var result = arr["result"];

              app.dialog.alert(result + "Login");
              // app.dialog.alert(arr["data"]["idUser"]);

              if (result == "success") {
                localStorage.username = $$("#username").val();
                for (var i = 0; i < arr["data"].length; i++) {
                  localStorage.idUser = arr["data"][i]["idUser"];
                }
                page.router.back("/");
              } else app.dialog.alert("Username atau password salah");
            });
          });
        } else if (page.name == "kategori") {
          // getMovies($$("#txtcari").val());
          app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/kategori.php", {}, function (data) {
            var arr = JSON.parse(data);
            var kategori = arr["data"];
            for (var i = 0; i < kategori.length; i++) {
              $$("#ul_kategori").append("<li><a href='/komikBased/" + kategori[i]["idKategori"] + "'>" + kategori[i]["namaKategori"] + "</a></li>");
            }
          });
        } else if (page.name == "komikBasedKategori") {
          var id = page.router.currentRoute.params.id;
          app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/komik_based_kategori.php", { id_kategori: id }, function (data) {
            var arr = JSON.parse(data);
            var komik = arr["data"];
            for (var i = 0; i < komik.length; i++) {
              $$("#comicK").append(
                "<div class='col-100'><div class='card'>" +
                  "<div class='card-header'>" +
                  komik[i]["namaKomik"] +
                  "</div><div class='card-content '>" +
                  "<img src='" +
                  komik[i]["poster"] +
                  "' width='100%'>" +
                  "</div><div class='caed-footer'><a  href='/bacaKomik/" +
                  komik[i]["id_komik"] +
                  "' class='button button-fill'>Baca</a>" +
                  "</div></div></div>"
              );
            }
          });
        } else if (page.name == "komik") {
          var id = page.router.currentRoute.params.id;
          app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/listOfKomik.php", {}, function (data) {
            var arr = JSON.parse(data);
            var komik = arr["data"];
            for (var i = 0; i < komik.length; i++) {
              $$("#comicKu").append(
                "<div class='col-100'><div class='card'>" +
                  "<div class='card-header'>" +
                  komik[i]["namaKomik"] +
                  "</div><div class='card-content '>" +
                  "<img src='" +
                  komik[i]["poster"] +
                  "' width='100%'>" +
                  "</div>" +
                  "<p>Rating :" +
                  komik[i]["Rating"] +
                  "</p>" +
                  "<div class='caed-footer'><a  href='/bacaKomik/" +
                  komik[i]["idKomik"] +
                  "' class='button button-fill'>Baca</a>" +
                  "</div></div></div>"
              );
            }
          });
        } else if (page.name == "favorit") {
          app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/favorit.php", { idUser: localStorage.idUser }, function (data) {
            var arr = JSON.parse(data);
            var komik = arr["data"];
            for (var i = 0; i < komik.length; i++) {
              $$("#favoritku").append(
                "<div class='col-100'><div class='card'>" +
                  "<div class='card-header'>" +
                  komik[i]["namaKomik"] +
                  "</div><div class='card-content '>" +
                  "<img src='" +
                  komik[i]["poster"] +
                  "' width='100%'>" +
                  "</div>" +
                  "<div class='caed-footer'><a  href='/bacaKomik/" +
                  komik[i]["idKomik"] +
                  "' class='button button-fill'>Baca</a>" +
                  "</div></div></div>"
              );
            }
          });
        } else if (page.name == "baca") {
          var id = page.router.currentRoute.params.id;
          app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/bacaKomik.php", { idKomik: id }, function (data) {
            var arr = JSON.parse(data);
            var komik = arr["data"];
            for (var i = 0; i < komik.length; i++) {
              $$("#bacaK").append("<div class='col-100'><div class='card'>" + "<div class='card-content '>" + "<img src='" + komik[i]["LinkGambar"] + "' width='100%'>" + "</div>" + "</div></div>");
            }
            $$("#st1").on("click", function () {
              $$(".f7-icons").css("background-color", "white");
              $$("#st1").css("background-color", "yellow");
              $$("#st1").css("border-radius", "20px");
              $$(".f7-icons").css("border-radius", "20px");
            });
            $$("#st2").on("click", function () {
              $$(".f7-icons").css("background-color", "white");
              $$("#st1,#st2").css("background-color", "yellow");
              $$("#st1").css("border-radius", "20px");
              $$(".f7-icons").css("border-radius", "20px");
            });
            $$("#st3").on("click", function () {
              $$(".f7-icons").css("background-color", "white");
              $$("#st1,#st2,#st3").css("background-color", "yellow");
              $$("#st1").css("border-radius", "20px");
              $$(".f7-icons").css("border-radius", "20px");
            });
            $$("#st4").on("click", function () {
              $$(".f7-icons").css("background-color", "white");
              $$("#st1,#st2,#st3,#st4").css("background-color", "yellow");
              $$("#st1").css("border-radius", "20px");
              $$(".f7-icons").css("border-radius", "20px");
            });
            $$("#st5").on("click", function () {
              $$(".f7-icons").css("background-color", "white");
              $$("#st1,#st2,#st3,#st4,#st5").css("background-color", "yellow");
              $$("#st1").css("border-radius", "20px");
              $$(".f7-icons").css("border-radius", "20px");
            });

            $$("#btnKomentar").on("click", function () {
              app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/addKomentar.php", { iduser: localStorage.idUser, idkomik: id, komen: $$("#komentar").val() }, function (data) {
                var arr = JSON.parse(data);
                var result = arr["result"];
                if (result == "success") {
                  app.dialog.alert("Sukses menambah komentar");
                  $$("#komentar").val("");
                  // app.view.main.router.navigate("/editmovie/" + arr["id"], {
                  //   reloadCurrent: true,
                  //   pushState: false,
                  // });
                } else app.dialog.alert("Gagal menambah data");
              });
            });
            $$("#btnFavorit").on("click", function () {
              app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/favoritCheck.php", {}, function (dataFav) {
                var arr = JSON.parse(dataFav);
                var komikFav = arr["data"];
                // for (var i = 0; i < komikFav.length; i++) {
                //   if (komikFav[i]["id_komikF"] == id && komikFav[i]["id_userF"] == localStorage.idUser) {
                //     app.dialog.alert("Komik sudah ada di Favorit!");
                //     i = komikFav.length;
                //   }
                //   else if (komikFav[i]["id_komikF"] != id && komikFav[i]["id_userF"] != localStorage.idUser) {
                // i = komikFav.length;
                app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/favoritAdd.php", { iduser: localStorage.idUser, idkomik: id }, function (data) {
                  var arr = JSON.parse(data);
                  var result = arr["result"];
                  if (result == "success") {
                    app.dialog.alert("Sukses menambahkan ke favorit!");
                  } else app.dialog.alert("Gagal menambah ke favorit");
                });
                // }
                // }
              });
            });
          });

          // for (var i = 1; i <= 5; i++) {
          //   $$(".bintang").append(" <img src='https://ubaya.fun/hybrid/160419007/gambarKomik/bintang-unfill.png' alt='' width='30' height='30' style='padding-top: 27px; margin-left: -31px;' id='ganti' onclick='gantiBintang(" + i + ")'/>");
          // }
        } else if (page.name == "komikCari") {
          var id = page.router.currentRoute.params.id;
          app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/cariKomik.php", {}, function (data) {
            var arr = JSON.parse(data);
            var komik = arr["data"];
            for (var i = 0; i < komik.length; i++) {
              $$("#searchKo").append(
                "<div class='col-100'><div class='card'>" +
                  "<div class='card-header'>" +
                  komik[i]["namaKomik"] +
                  "</div><div class='card-content '>" +
                  "<img src='" +
                  komik[i]["poster"] +
                  "' width='100%'>" +
                  "</div>" +
                  "<p>Rating :" +
                  komik[i]["Rating"] +
                  "</p>" +
                  "<div class='caed-footer'><a  href='/bacaKomik/" +
                  komik[i]["idKomik"] +
                  "' class='button button-fill'>Baca</a>" +
                  "</div></div></div>"
              );
            }
            $$("#btncari").on("click", function () {
              $$("#searchKo").html(" ");
              app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/cariKomik.php", { cari: $$("#txtcari").val() }, function (data) {
                var arr = JSON.parse(data);
                var komik = arr["data"];

                for (var i = 0; i < komik.length; i++) {
                  $$("#searchKo").append(
                    "<div class='col-100'><div class='card'>" +
                      "<div class='card-header'>" +
                      komik[i]["namaKomik"] +
                      "</div><div class='card-content '>" +
                      "<img src='" +
                      komik[i]["poster"] +
                      "' width='100%'>" +
                      "</div>" +
                      "<p>Rating :" +
                      komik[i]["Rating"] +
                      "</p>" +
                      "<div class='caed-footer'><a  href='/bacaKomik/" +
                      komik[i]["idKomik"] +
                      "' class='button button-fill'>Baca</a>" +
                      "</div></div></div>"
                  );
                }
              });
            });
          });
        }
      });

      $$(document).on("page:afterin", function (e, page) {
        if (!localStorage.username) {
          page.router.navigate("/login/");
        }
      });
    },
  },
});
