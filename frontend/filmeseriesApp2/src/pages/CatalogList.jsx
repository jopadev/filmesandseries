import React, { useState, useEffect, useRef } from "react";
import Card from '../components/Card';
import "./CatalogList.css";

function CatalogList()
{
  const [filmes, setFilmes] = useState(
  [{
    "id": "108766",
    "title": "Vingadores: Ultimato",
    "poster": "https://media.fstatic.com/h0xmjvr80FfMoZDdO8hwqSGA4L8=/154x231/smart/filters:format(webp)/media/movies/covers/2019/03/d1nmwmgvaaajv5mjpg-large_4c7c.jpg",
    "link": "/vingadores-ultimato-t108766/",
    "rating": 4.3
  },
  {
    "id": "8531",
    "title": "Avatar",
    "poster": "https://media.fstatic.com/ysVIL0e_kASXmud98IVC4lKiTPM=/154x231/smart/filters:format(webp)/media/movies/covers/2011/06/71fc1d0bb2bc1483e66941bb2f17d830.jpg",
    "link": "/avatar-t8531/",
    "rating": 3.6
  },
  {
    "id": "7409",
    "title": "Titanic",
    "poster": "https://media.fstatic.com/TDO64HQuaszq_xpt4l5BAfEPfUM=/154x231/smart/filters:format(webp)/media/movies/covers/2011/06/da9393500913f67e2209cbd3bfaa1700.jpg",
    "link": "/titanic-t7409/",
    "rating": 4.0
  },
  {
    "id": "68292",
    "title": "Star Wars, Episódio VII: O Despertar da Força",
    "poster": "https://media.fstatic.com/eJkL76nRvvinOHhSCIMiCmOB5E4=/154x231/smart/filters:format(webp)/media/movies/covers/2015/10/star-wars-o-despertar-da-forca_t68292.jpg",
    "link": "/star-wars-episodio-vii-o-despertar-da-forca-t68292/",
    "rating": 4.3
  },
  {
    "id": "73720",
    "title": "Vingadores: Guerra Infinita",
    "poster": "https://media.fstatic.com/i1-j3t9pOVc0B0I7iQbwiFBV8rc=/154x231/smart/filters:format(webp)/media/movies/covers/2018/03/3651678.jpg-r_770_1100-f_jpg-q_x-xxyxx.jpg",
    "link": "/vingadores-guerra-infinita-t73720/",
    "rating": 4.3
  },
  {
    "id": "14190",
    "title": "Jurassic World: O Mundo dos Dinossauros",
    "poster": "https://media.fstatic.com/12iPnQv800bM6TO4H6A30FFvMG8=/154x231/smart/filters:format(webp)/media/movies/covers/2015/04/jurassic-world-o-mundo-dos-dinossauros_t14190_EQatnKm.jpg",
    "link": "/jurassic-world-o-mundo-dos-dinossauros-t14190/",
    "rating": 3.6
  },
  {
    "id": "218226",
    "title": "O Rei Leão",
    "poster": "https://media.fstatic.com/UONffw_9NwFoYKs4RfxICUrYliQ=/154x231/smart/filters:format(webp)/media/movies/covers/2019/07/lion_king_2.jpg",
    "link": "/o-rei-leao-t218226/",
    "rating": 3.8
  },
  {
    "id": "15324",
    "title": "Os Vingadores",
    "poster": "https://media.fstatic.com/1aIsn2IyR4z8Ac9eXfRwPXGbXqE=/154x231/smart/filters:format(webp)/media/movies/covers/2014/06/os-vingadores-the-avengers_t15324.jpg",
    "link": "/os-vingadores-t15324/",
    "rating": 4.0
  },
  {
    "id": "53781",
    "title": "Velozes e Furiosos 7",
    "poster": "https://media.fstatic.com/TUbxsUBoGYDOrF8ya3-TR8vSy2c=/154x231/smart/filters:format(webp)/media/movies/covers/2015/02/velozes-e-furiosos-7_t53781_EWwarW2.jpg",
    "link": "/velozes-e-furiosos-7-t53781/",
    "rating": 3.8
  },
  {
    "id": "55817",
    "title": "Vingadores: Era de Ultron",
    "poster": "https://media.fstatic.com/dHHG44vASH_SxFEiOnWcIKq7QA0=/154x231/smart/filters:format(webp)/media/movies/covers/2015/02/vingadores-era-de-ultron_t55817_W865z0A.jpg",
    "link": "/vingadores-era-de-ultron-t55817/",
    "rating": 3.7
  },
  {
    "id": "100175",
    "title": "Frozen II",
    "poster": "https://media.fstatic.com/mMLNxoHPzxdVdUFJbETgjMBcMAk=/154x231/smart/filters:format(webp)/media/movies/covers/2019/10/image001-2182866798.jpg",
    "link": "/frozen-ii-t100175/",
    "rating": 3.6
  },
  {
    "id": "58708",
    "title": "Pantera Negra",
    "poster": "https://media.fstatic.com/v3UETnMAV38-m4kROVbQfLmhBT8=/154x231/smart/filters:format(webp)/media/movies/covers/2018/06/Black-Panther-poster-main-xl.jpg",
    "link": "/pantera-negra-t58708/",
    "rating": 4.2
  },
  {
    "id": "15696",
    "title": "Harry Potter e as Relíquias da Morte - Parte 2",
    "poster": "https://media.fstatic.com/cG0zrHVAAFn_591X7tC1_HsON-Q=/154x231/smart/filters:format(webp)/media/movies/covers/2011/06/f59f4a5093d463e862eb0fb5c6170ff5_3.jpg",
    "link": "/harry-potter-e-as-reliquias-da-morte-parte-2-t15696/",
    "rating": 4.3
  },
  {
    "id": "68343",
    "title": "Star Wars, Episódio VIII: Os Últimos Jedi",
    "poster": "https://media.fstatic.com/iJUM8uZKpJrnKPDXzmcYcArFdCA=/154x231/smart/filters:format(webp)/media/movies/covers/2017/10/thelastjedi.png",
    "link": "/star-wars-episodio-viii-os-ultimos-jedi-t68343/",
    "rating": 4.1
  },
  {
    "id": "128584",
    "title": "Jurassic World: Reino Ameaçado",
    "poster": "https://media.fstatic.com/kRmelnUcIq9lS-qt0dIvAXZtmXY=/154x231/smart/filters:format(webp)/media/movies/covers/2018/04/unnamed_qHby4w2.jpg",
    "link": "/jurassic-world-reino-ameacado-t128584/",
    "rating": 3.4
  },
  {
    "id": "51482",
    "title": "Frozen: Uma Aventura Congelante",
    "poster": "https://media.fstatic.com/w7ujXkecVD6Tz0zW9Dv9DPoTius=/154x231/smart/filters:format(webp)/media/movies/covers/2013/10/frozen-uma-aventura-congelante_t51482.jpg",
    "link": "/frozen-uma-aventura-congelante-t51482/",
    "rating": 3.9
  },
  {
    "id": "52212",
    "title": "A Bela e a Fera",
    "poster": "https://media.fstatic.com/OWrNDHfIp-w5k7lQ9_VJrA0qCRc=/154x231/smart/filters:format(webp)/media/movies/covers/2017/01/beauty_and_the_beast_ver4_xlg.jpg",
    "link": "/a-bela-e-a-fera-t52212/",
    "rating": 3.9
  },
  {
    "id": "96426",
    "title": "Os Incríveis 2",
    "poster": "https://media.fstatic.com/_5uNSJBrLP9d5jBz4bDXSz75d4c=/154x231/smart/filters:format(webp)/media/movies/covers/2018/04/IMG_20180412_150009.jpg",
    "link": "/os-incriveis-2-t96426/",
    "rating": 4.1
  },
  {
    "id": "89155",
    "title": "Velozes e Furiosos 8",
    "poster": "https://media.fstatic.com/X1inPRBhFYrQABvlSe7YUe3DH6o=/154x231/smart/filters:format(webp)/media/movies/covers/2017/03/IMG_20170303_161005.jpg",
    "link": "/velozes-e-furiosos-8-t89155/",
    "rating": 3.4
  },
  {
    "id": "26573",
    "title": "Homem de Ferro 3",
    "poster": "https://media.fstatic.com/xp4KSSbe2zcumgRSVaEMfC9q31c=/154x231/smart/filters:format(webp)/media/movies/covers/2013/02/98c943ad8d9ed3a1a189c236f7176a6e.jpg",
    "link": "/homem-de-ferro-3-t26573/",
    "rating": 3.5
  },
  {
    "id": "74657",
    "title": "Minions",
    "poster": "https://media.fstatic.com/xzLs3yXwDH68_w9ni30BZoBszt4=/154x231/smart/filters:format(webp)/media/movies/covers/2015/02/minions_t74657.jpg",
    "link": "/minions-t74657/",
    "rating": 3.3
  },
  {
    "id": "93414",
    "title": "Capitão América: Guerra Civil",
    "poster": "https://media.fstatic.com/880jlidqgPoxdDnHDU7lmeLvPsI=/154x231/smart/filters:format(webp)/media/movies/covers/2016/03/capitao-america-guerra-civil_t93414_1ZIsJit.jpg",
    "link": "/capitao-america-guerra-civil-t93414/",
    "rating": 3.9
  },
  {
    "id": "84099",
    "title": "Aquaman",
    "poster": "https://media.fstatic.com/iaIUvADq2qH0H-iHPraZQtcmuNU=/154x231/smart/filters:format(webp)/media/movies/covers/2018/11/aquaman_ver11.jpg",
    "link": "/aquaman-t84099/",
    "rating": 3.7
  },
  {
    "id": "243553",
    "title": "Homem-Aranha: Longe de Casa",
    "poster": "https://media.fstatic.com/QZoBHsz5VfUig3LC85leVJORd1U=/154x231/smart/filters:format(webp)/media/movies/covers/2019/06/image001.png",
    "link": "/homem-aranha-longe-de-casa-t243553/",
    "rating": 3.6
  },
  {
    "id": "109585",
    "title": "Capitã Marvel",
    "poster": "https://media.fstatic.com/ySw3eAAmN06h-_exj69xbF3scTs=/154x231/smart/filters:format(webp)/media/movies/covers/2018/12/0230901.jpg-r_1920_1080-f_jpg-q_x-xxyxx.jpg",
    "link": "/capita-marvel-t109585/",
    "rating": 3.7
  },
  {
    "id": "12326",
    "title": "Transformers: O Lado Oculto da Lua",
    "poster": "https://media.fstatic.com/BgcUaGNiXcv1CgjAJpiXpxDL7a0=/154x231/smart/filters:format(webp)/media/movies/covers/2011/04/9a09528181c1417baab1bb4094d41a67.jpg",
    "link": "/transformers-o-lado-oculto-da-lua-t12326/",
    "rating": 3.2
  },
  {
    "id": "842",
    "title": "O Senhor dos Anéis: O Retorno do Rei",
    "poster": "https://media.fstatic.com/fyFV_WdK4LfyWCXK-ZZHz205nqQ=/154x231/smart/filters:format(webp)/media/movies/covers/2011/07/e29bbb95b0528e4805f2009d451135c0.jpg",
    "link": "/o-senhor-dos-aneis-o-retorno-do-rei-t842/",
    "rating": 4.5
  },
  {
    "id": "31713",
    "title": "007: Operação Skyfall",
    "poster": "https://media.fstatic.com/igq8GX2C9J9QPvhxqR0b_pGhqR4=/154x231/smart/filters:format(webp)/media/movies/covers/2012/05/a670888c36bf74e4a288a8ceb2d3a88c.jpg",
    "link": "/007-operacao-skyfall-t31713/",
    "rating": 3.9
  },
  {
    "id": "48587",
    "title": "Transformers: A Era da Extinção",
    "poster": "https://media.fstatic.com/9hym04B7tL-SuoKnjbj9lcjEJ00=/154x231/smart/filters:format(webp)/media/movies/covers/2014/05/transformers-a-era-da-extincao_t48587_1.jpg",
    "link": "/transformers-a-era-da-extincao-t48587/",
    "rating": 3.0
  },
  {
    "id": "19914",
    "title": "Batman: O Cavaleiro das Trevas Ressurge",
    "poster": "https://media.fstatic.com/VZxh5pQ-tfe1GXP3iYUJiB6ZMP0=/154x231/smart/filters:format(webp)/media/movies/covers/2011/12/a3fd3a1ae7a64c8b31e547bc14d3a2ec.jpg",
    "link": "/batman-o-cavaleiro-das-trevas-ressurge-t19914/",
    "rating": 4.2
  },
  {
    "id": "94715",
    "title": "Toy Story 4",
    "poster": "https://media.fstatic.com/TdAk70TLwh6rnzHG0Q5BMqJpVu8=/154x231/smart/filters:format(webp)/media/movies/covers/2019/03/IMG_2133.JPG",
    "link": "/toy-story-4-t94715/",
    "rating": 4.1
  },
  {
    "id": "8829",
    "title": "Toy Story 3",
    "poster": "https://media.fstatic.com/cyGfdj9BtIIut3gj36qm8tMlWUM=/154x231/smart/filters:format(webp)/media/movies/covers/2011/06/adc86e33fb905dba7da2ba276ca08a29_1.jpg",
    "link": "/toy-story-3-t8829/",
    "rating": 4.3
  },
  {
    "id": "208359",
    "title": "Coringa",
    "poster": "https://media.fstatic.com/5PJLebnjevjYw5Pad_hyhLAur-o=/154x231/smart/filters:format(webp)/media/movies/covers/2019/08/Joker-2019-Poster-joker-2019-42983372-1382-2048.jpg",
    "link": "/coringa-t208359/",
    "rating": 4.4
  },
  {
    "id": "936",
    "title": "Piratas do Caribe: O Baú da Morte",
    "poster": "https://media.fstatic.com/18HmdFhhy9Rp4dBi84hAaoBDo-c=/154x231/smart/filters:format(webp)/media/movies/covers/2019/09/waFr5RVKaQ9dzOt3nQuIVB1FiPu.jpg",
    "link": "/piratas-do-caribe-o-bau-da-morte-t936/",
    "rating": 3.9
  },
  {
    "id": "99935",
    "title": "Rogue One: Uma História Star Wars",
    "poster": "https://media.fstatic.com/X6WOLbCkQYaaivN8FvWYGtkW5eY=/154x231/smart/filters:format(webp)/media/movies/covers/2016/10/rogueone.jpg",
    "link": "/rogue-one-uma-historia-star-wars-t99935/",
    "rating": 4.2
  },
  {
    "id": "219252",
    "title": "Aladdin",
    "poster": "https://media.fstatic.com/rqwu_dYpiFDGf0CgndWM8odn7Yw=/154x231/smart/filters:format(webp)/media/movies/covers/2019/05/images_24Yuu7d.jpg",
    "link": "/aladdin-t219252/",
    "rating": 3.9
  },
  {
    "id": "10032",
    "title": "Piratas do Caribe: Navegando em Águas Misteriosas",
    "poster": "https://media.fstatic.com/jjyyFNWLmpi2X6JhWmxzr2eDW9E=/154x231/smart/filters:format(webp)/media/movies/covers/2011/06/34557d4cbfe6662dadc6ba5c37c65a6c.jpg",
    "link": "/piratas-do-caribe-navegando-em-aguas-misteriosas-t10032/",
    "rating": 3.6
  },
  {
    "id": "92557",
    "title": "Meu Malvado Favorito 3",
    "poster": "https://media.fstatic.com/5wTiPjQ6Owhh0XqnoK07bIHSfGQ=/154x231/smart/filters:format(webp)/media/movies/covers/2017/03/meumalvadofavorito3_5.jpg",
    "link": "/meu-malvado-favorito-3-t92557/",
    "rating": 3.4
  },
  {
    "id": "601",
    "title": "Jurassic Park: O Parque dos Dinossauros",
    "poster": "https://media.fstatic.com/Ka-_WRs7nvAcX2XhFI32-FTFwjM=/154x231/smart/filters:format(webp)/media/movies/covers/2013/10/jurassic-park-o-parque-dos-dinossauros_t601_4.jpg",
    "link": "/jurassic-park-o-parque-dos-dinossauros-t601/",
    "rating": 3.9
  },
  {
    "id": "61563",
    "title": "Procurando Dory",
    "poster": "https://media.fstatic.com/VsGbYzB_LX1R5Y8aE7OgvKrd470=/154x231/smart/filters:format(webp)/media/movies/covers/2016/02/procurando-dory_t61563.jpg-large",
    "link": "/procurando-dory-t61563/",
    "rating": 4.0
  }
]);

//f.dataLancamento.split("/")[2]
  useEffect(()=>{
    let sChave ="d641ac43f1b2e9b1538d90e2038f0c96";

  });

    return (
        <div>
            <h3>Filmes Mais Assistidos</h3>
            <div className="catalog-list">{
                    filmes.map((f,i) => <div key={i} className="d-flex"><Card key={i} titulo={f.title} linkImagem={f.poster} anoLancamento={f.rating}/></div>)
                }
            </div>
       </div>
    );
}
export default CatalogList;