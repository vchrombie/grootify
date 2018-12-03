let active = true;

try {
  chrome.storage.sync.get({
    activate: true
  }, function(items) {
    active = items.activate;
    if (active) {
      main();
    }
  });
} catch (e) {
  if (active) {
    main();
  }
}

//Content script, image replacer
function main() {

//grootify
(function($) {
  var self = {
    grootifyImgs: [
      "https://breakinggeek.files.wordpress.com/2017/03/guardians-of-the-galaxy-vol-2-trailer-baby-groot-08-groot-waves.png?w=775",
      "https://www.syfy.com/sites/syfy/files/styles/1200x1200/public/wire/legacy/2017/05/baby-groot-dancing.jpg?itok=RN4bkhIQ&timestamp=1519770659",
      "https://data.junkee.com/wp-content/uploads/2018/05/groot.jpg",
      "https://www.simplemost.com/wp-content/uploads/2018/03/Baby-Groot-750x500.jpg",
      "https://fsmedia.imgix.net/3a/9a/b8/bf/370d/4efd/9374/844c69aa367d/guardiansofthegalaxy2-groot-screamingjpg.jpeg?rect=55%2C0%2C1068%2C534&dpr=2&auto=format%2Ccompress&w=650",
      "https://nerdist.com/wp-content/uploads/2017/06/dancingbabygroot-06102017.jpg",
      "http://assets1.ignimgs.com/2018/02/28/babygroot-1519788597042_1280w.jpg",
      "https://cdn3.volusion.com/ondfq.dtexo/v/vspfiles/photos/NE38719-2.jpg",
      "https://s12emagst.akamaized.net/products/16625/16624816/images/res_2d0fc59d2ed3bcaea8ae6176cbcf8df2_full.jpg",
      "https://vignette.wikia.nocookie.net/universocinematograficomarvel/images/1/16/Groot_textless.jpg/revision/latest?cb=20150921015319&path-prefix=pt",
      "https://img.elcomercio.pe/files/ec_article_multimedia_gallery/uploads/2018/05/02/5aea029d247b0.jpeg",
      "https://media.cuinsight.com/wp-content/uploads/2018/04/Screen-Shot-2018-04-16-at-11.01.27-PM.png",
      "https://www.gambody.com/image/243/preview.jpg",
      "https://cdn1us.denofgeek.com/sites/denofgeekus/files/styles/main_wide/public/2016/12/guardians-of-the-galaxy-vol-2-baby-groot-button.jpg?itok=LtNmG1mp",
      "https://aa1a5178aef33568e9c4-a77ea51e8d8892c1eb8348eb6b3663f6.ssl.cf5.rackcdn.com/p/full/524763fa-693b-4337-adcd-7952a45c0a30.jpg",
    ],

      //Handles all images on page with an interval of time
      handleImages(lstImgs, time) {
        $.each($("img"), function(i, item) {
          //Skip if image is already replaced
          if ($.inArray($(item).attr("src"), lstImgs) === -1) {
            var h = $(item).height();
            var w = $(item).width();

            //If image loaded
            if (h > 0 && w > 0) {

              self.handleImg(item, lstImgs);
            } else {
              //Replace when loaded
              $(item).load(function() {
                //Prevent infinite loop
                if ($.inArray($(item).attr("src"), lstImgs) == -1) {
                  self.handleImg(item, lstImgs);
                }
              });
            }
          }
        });

        //Keep replacing
        if (time > 0) {
          setTimeout(function() {
            self.handleImages(lstImgs, time);
          }, time);
        }
      },
      //Replace one image
      handleImg(item, lstImgs) {
        $(item).error(function() {
          //Handle broken imgs
          self.handleBrokenImg(item, lstImgs);
        });

        self.setRandomImg(item, lstImgs);
      },
      //Set a random image from lstImgs to item
      setRandomImg(item, lstImgs) {
        var h = $(item).height();
        var w = $(item).width();
        $(item).css("width", w + "px").css("height", h + "px");
        $(item).attr("src", lstImgs[Math.floor(Math.random() * lstImgs.length)]);
      },
      //Removed broken image from lstImgs, run handleImg on item
      handleBrokenImg(item, lstImgs) {

        var brokenImg = $(item).attr("src");
        var index = lstImgs.indexOf(brokenImg);
        if (index > -1) {
          lstImgs.splice(index, 1);
        }
        self.setRandomImg(item, lstImgs);
      },
    };

    //Run on jQuery ready
    $(function() {

      self.handleImages(self.grootifyImgs, 3000);

    });

    //Set global variable
    $.grootify = self;


  })(jQuery);
  //end grootify
}
