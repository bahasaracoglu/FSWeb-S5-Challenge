import axios from "axios";

const Card = (makale) => {
  // GÖREV 5
  // ---------------------
  // Aşağıda gördüğünüz işaretlemeyi döndürmesi gereken bu fonksiyonu uygulayın.
  // Tek argümanı olarak "anabaslik", "yazarFoto" ve "yazarAdı" özelliklerine sahip bir "makale" nesnesi alır.
  // Kullanılan etiketler, öğelerin hiyerarşisi ve öznitelikleri sağlanan işaretlemeyle tam olarak eşleşmelidir!
  // Öğelerin içindeki metin, "textContent" özelliği kullanılarak ayarlanacaktır ("innerText" DEĞİL).
  // Bir kullanıcı bir kartı tıkladığında makalenin başlığının konsola kaydedilmesi için click event dinleyicisi ekleyin.
  //
  // <div class="card">
  //   <div class="headline">{ anabaslik }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ yazarFoto }>
  //     </div>
  //     <span>{ yazarAdı } tarafından</span>
  //   </div>
  // </div>
  //

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  const headlineDiv = document.createElement("div");
  headlineDiv.classList.add("headline");
  headlineDiv.textContent = makale.anabaslik;
  cardDiv.append(headlineDiv);

  const authorDiv = document.createElement("div");
  authorDiv.classList.add("author");
  cardDiv.append(authorDiv);

  const imgCont = document.createElement("div");
  imgCont.classList.add("img-container");
  authorDiv.append(imgCont);

  const imgElement = document.createElement("img");
  imgElement.src = makale.yazarFoto;
  imgCont.append(imgElement);

  const spanYazar = document.createElement("span");
  spanYazar.textContent = makale.yazarAdi + " tarafından";
  authorDiv.append(spanYazar);

  cardDiv.addEventListener("click", function (event) {
    console.log(headlineDiv.textContent);
  });

  return cardDiv;
};

const cardEkleyici = (secici) => {
  // GÖREV 6
  // ---------------------
  // Tek bağımsız değişkeni olarak bir css seçici alan bu fonksiyonu uygulayın.
  // Makaleleri bu uç noktadan almalıdır: `http://localhost:5001/api/makaleler` (console.log ile test edin!!).
  // Bununla birlikte, makaleler tek bir düzenli dizi halinde organize edilmemiştir. Yanıtı yakından inceleyin!
  // Card bileşenini kullanarak yanıttaki her makale nesnesinden bir kart oluşturun.
  // Her cardı, fonksiyona iletilen seçiciyle eşleşen DOM'daki öğeye ekleyin.
  //

  const seciciCardDOM = document.querySelector(secici);
  axios
    .get("http://localhost:5001/api/makaleler")
    .then(function (response) {
      // handle success

      const data = [];

      Object.values(response.data.makaleler).map((konular) => {
        konular.forEach((element) => {
          data.push(element);
        });
      });

      data.forEach((makaleler) => {
        seciciCardDOM.append(Card(makaleler));
      });

      console.log(response);
      console.log(data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
};

export { Card, cardEkleyici };
