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
      function coba(num) {
        var result = "";
        for (i = 1; i <= num; i++) {
          for (j = 1; j <= num; j++) {
            result += "halo" + i + " " + j + "\n";
          }
        }
        return result;
      }

      // function palindrom (huruf)
      // {
      //   var hur =

      // }

      // function checkPalindrome(string) {
      //   // find the length of a string
      //   const len = string.length;

      //   // loop through half of the string
      //   for (let i = 0; i < len / 2; i++) {
      //     // check if first and last string are same
      //     console.log(string[len - i]);
      //     console.log(i);

      //     if (string[i] !== string[len - 1 - i]) {
      //       return "It is not a palindrome";
      //     }
      //   }
      //   return "It is a palindrome";
      // }

      // function fubo(num) {
      //   if (num === 0) {
      //     return 1;
      //   }
      //   return num * fubo(num - 1);
      // }

      // function fubo(n) {
      //   let answer = 1;
      //   if (n == 0 || n == 1) {
      //     return answer;
      //   } else {
      //     for (var i = n; i >= 1; i--) {
      //       answer = answer * i;
      //       console.log(answer);
      //     }
      //     return answer;
      //   }
      // }

      // const string = prompt("Enter a string: ");

      // const value = fubo(string);

      // console.log(value);
      var num = "";
      for (var i = 0; i <= 5; i++) {
        num = num + i;
      }

      console.log(num); // printing the value of i
      // function coba1(num) {
      // var result = "";
      // for (i = 0; i <= 6; i++) {
      //   for (j = 0; j < i; j++) {
      //     result += "*";
      //   }
      //   console.log(result + j);

      //   result = "";
      // }

      //   return result;
      // }
      $$(document).on("page:init", function (e, page) {
        if (page.name == "login") {
          localStorage.removeItem("username");
          localStorage.removeItem("idUser");
          // console.log(coba1(5));
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
              $$("#ul_kategori").append("<li><a class='color-orange' href='/komikBased/" + kategori[i]["idKategori"] + "'>" + kategori[i]["namaKategori"] + "</a></li>");
            }
          });
        } else if (page.name == "komikBasedKategori") {
          var id = page.router.currentRoute.params.id;
          app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/komik_based_kategori.php", { id_kategori: id }, function (data) {
            var arr = JSON.parse(data);
            var komik = arr["data"];
            for (var i = 0; i < komik.length; i++) {
              $$("#comicK").append(
                "<div class='col-100'><div class='card' style='box-shadow:  0 2.8px 2.2px rgba(0, 0, 0, 0.034),0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12);'>" +
                  "<div class='card-header'>" +
                  "<h3>" +
                  komik[i]["namaKomik"] +
                  "</h3>" +
                  "</div><div class='card-content '>" +
                  "<img src='" +
                  komik[i]["poster"] +
                  "' width='100%'>" +
                  "</div><div class='card-footer' style='background-color:orange;'><a  href='/bacaKomik/" +
                  komik[i]["id_komik"] +
                  "' class='button button-raised button-round color-orange' style='width:80%;background-color:white;margin: auto;'>Baca</a>" +
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
                "<div class='col-100'><div class='card' style='box-shadow:  0 2.8px 2.2px rgba(0, 0, 0, 0.034),0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12);'>" +
                  "<div class='card-header'>" +
                  "<h3>" +
                  komik[i]["namaKomik"] +
                  "</h3>" +
                  "</div><div class='card-content '>" +
                  "<img src='" +
                  komik[i]["poster"] +
                  "' width='100%'>" +
                  "</div>" +
                  "<div class='card-footer' style='background-color:orange;'>" +
                  "<h3  style='color:white;'>Rating : " +
                  komik[i]["Rating"] +
                  "</h3>" +
                  "<a  href='/bacaKomik/" +
                  komik[i]["idKomik"] +
                  "' class='button button-raised button-round color-orange' style='width:80%;background-color:white;margin: auto;'>Baca</a>" +
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
                "<div class='col-100'><div class='card' style='box-shadow:  0 2.8px 2.2px rgba(0, 0, 0, 0.034),0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12);'>" +
                  "<div class='card-header'>" +
                  "<h3>" +
                  komik[i]["namaKomik"] +
                  "</h3>" +
                  "</div><div class='card-content '>" +
                  "<img src='" +
                  komik[i]["poster"] +
                  "' width='100%'>" +
                  "</div><div class='card-footer' style='background-color:orange;'><a  href='/bacaKomik/" +
                  komik[i]["idKomik"] +
                  "' class='button button-raised button-round color-orange' style='width:80%;background-color:white;margin: auto;'>Baca</a>" +
                  "</div></div></div>"
              );
            }
          });
        } else if (page.name == "baca") {
          var id = page.router.currentRoute.params.id;
          app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/bacaKomik.php", { idKomik: id }, function (data) {
            var arr = JSON.parse(data);
            var komik = arr["data"]["gambar"];
            var komentar = arr["data"]["komen"];
            for (var i = 0; i < komik.length; i++) {
              $$("#bacaK").append("<div class='col-100'><div class='card'>" + "<div class='card-content '>" + "<img src='" + komik[i]["LinkGambar"] + "' width='100%'>" + "</div>" + "</div></div>");
            }
            for (var i = 0; i < komentar.length; i++) {
              $$("#komentarUser").append(
                "<li>" +
                  "<div class='item-inner'><div class='item-title-row'><div class='item-title'>" +
                  komentar[i]["username"] +
                  "</div></div>" +
                  "<div class='item-subtitle'>Comment:</div>" +
                  "<div id='komenVal' idKomen='" +
                  komentar[i]["komentar"] +
                  "' class='item-text'>" +
                  komentar[i]["komentar"] +
                  "</div>" +
                  "<div id='tmptHapus'>" +
                  (komentar[i]["id_userC"] == localStorage.idUser ? "<button id='btnHapus' idKomen=" + komentar[i]["komentar"] + " class='button button-raised button-round color-orange'>Hapus</button>" : "") +
                  "</div>" +
                  "</div>" +
                  "</li>"
              );
              // alert($$(this)("item-text").text());
              // if (komentar[i]["id_userC"] == localStorage.idUser) {
              //   $$("#tmptHapus").append("<button id='btnHapus' class='button button-raised button-round color-orange'>Hapus</button>");
              // } else {
              //   $$("#tmptHapus").html("");
              // }
              $$("#btnHapus").on("click", function () {
                // alert($$(this).attr("idKomen"));
                app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/hapusKomen.php", { iduser: localStorage.idUser, idkomik: id, komentar: $$(this).attr("idKomen") }, function (data) {
                  var arr = JSON.parse(data);
                  var result = arr["result"];
                  if (result == "success") {
                    app.dialog.alert("berhasil menghapus komentar!");
                    app.view.main.router.navigate("/komik", {
                      reloadCurrent: true,
                      pushState: false,
                    });
                  } else app.dialog.alert("gagal menghapus komentar");
                });
              });
            }

            $$("#st1").on("click", function () {
              $$(".f7-icons").css("background-color", "white");
              $$("#st1").css("background-color", "yellow");
              $$("#st1").css("border-radius", "20px");
              $$(".f7-icons").css("border-radius", "20px");
              app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/addRating.php", { iduser: localStorage.idUser, idkomik: id, rating: parseFloat("1") }, function (data) {
                var arr = JSON.parse(data);
                var result = arr["result"];
                if (result == "success") {
                  app.dialog.alert("Sukses memberikan rating!");
                } else app.dialog.alert("gagal memberikan rating");
              });
            });
            $$("#st2").on("click", function () {
              $$(".f7-icons").css("background-color", "white");
              $$("#st1,#st2").css("background-color", "yellow");
              $$("#st1").css("border-radius", "20px");
              $$(".f7-icons").css("border-radius", "20px");
              app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/addRating.php", { iduser: localStorage.idUser, idkomik: id, rating: parseFloat("2") }, function (data) {
                var arr = JSON.parse(data);
                var result = arr["result"];
                if (result == "success") {
                  app.dialog.alert("Sukses memberikan rating!");
                } else app.dialog.alert("gagal memberikan rating");
              });
            });
            $$("#st3").on("click", function () {
              $$(".f7-icons").css("background-color", "white");
              $$("#st1,#st2,#st3").css("background-color", "yellow");
              $$("#st1").css("border-radius", "20px");
              $$(".f7-icons").css("border-radius", "20px");
              app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/addRating.php", { iduser: localStorage.idUser, idkomik: id, rating: parseFloat("3") }, function (data) {
                var arr = JSON.parse(data);
                var result = arr["result"];
                if (result == "success") {
                  app.dialog.alert("Sukses memberikan rating!");
                } else app.dialog.alert("gagal memberikan rating");
              });
            });
            $$("#st4").on("click", function () {
              $$(".f7-icons").css("background-color", "white");
              $$("#st1,#st2,#st3,#st4").css("background-color", "yellow");
              $$("#st1").css("border-radius", "20px");
              $$(".f7-icons").css("border-radius", "20px");
              app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/addRating.php", { iduser: localStorage.idUser, idkomik: id, rating: parseFloat("4") }, function (data) {
                var arr = JSON.parse(data);
                var result = arr["result"];
                // var komik = arr["data"];
                // for (var i = 0; i < komik.length; i++) {
                //   alert(komik[i]["id_userR"]);
                // }
                if (result == "success") {
                  app.dialog.alert("Sukses memberikan rating!");
                } else app.dialog.alert("gagal memberikan rating");
              });
            });
            $$("#st5").on("click", function () {
              $$(".f7-icons").css("background-color", "white");
              $$("#st1,#st2,#st3,#st4,#st5").css("background-color", "yellow");
              $$("#st1").css("border-radius", "20px");
              $$(".f7-icons").css("border-radius", "20px");
              app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/addRating.php", { iduser: localStorage.idUser, idkomik: id, rating: parseFloat("5") }, function (data) {
                var arr = JSON.parse(data);
                var result = arr["result"];
                if (result == "success") {
                  app.dialog.alert("Sukses memberikan rating!");
                } else app.dialog.alert("gagal memberikan rating");
              });
            });

            $$("#btnKomentar").on("click", function () {
              if (!$$("#komentar") || $$("#komentar").val() == "") {
                app.dialog.alert("isikan komentar terlebih dahulu");
              } else {
                app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/addKomentar.php", { iduser: localStorage.idUser, idkomik: id, komen: $$("#komentar").val() }, function (data) {
                  var arr = JSON.parse(data);
                  var result = arr["result"];
                  if (result == "success") {
                    $$("#komentar").val("");
                    app.dialog.alert("Sukses menambah komentar");
                    app.view.main.router.navigate("/komik", {
                      reloadCurrent: true,
                      pushState: false,
                    });
                  } else app.dialog.alert("Gagal menambah komentar");
                });
              }
            });
            $$("#btnFavorit").on("click", function () {
              // app.request.post("https://ubaya.fun/hybrid/160419007/komik_api/favoritCheck.php", {}, function (dataFav) {
              //   var arr = JSON.parse(dataFav);
              //   var komikFav = arr["data"];
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
                  app.view.main.router.navigate("/favorit", {
                    reloadCurrent: true,
                    pushState: false,
                  });
                } else app.dialog.alert("Gagal menambah ke favorit");
              });
              // }
              // }
              // });
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
                "<div class='col-100'><div class='card' style='box-shadow:  0 2.8px 2.2px rgba(0, 0, 0, 0.034),0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12);'>" +
                  "<div class='card-header'>" +
                  "<h3>" +
                  komik[i]["namaKomik"] +
                  "</h3>" +
                  "</div><div class='card-content '>" +
                  "<img src='" +
                  komik[i]["poster"] +
                  "' width='100%'>" +
                  "</div>" +
                  "<div class='card-footer' style='background-color:orange;'>" +
                  "<h3  style='color:white;'>Rating : " +
                  komik[i]["Rating"] +
                  "</h3>" +
                  "<a  href='/bacaKomik/" +
                  komik[i]["idKomik"] +
                  "' class='button button-raised button-round color-orange' style='width:80%;background-color:white;margin: auto;'>Baca</a>" +
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
