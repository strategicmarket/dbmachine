// middleware example to simplify handling of routes

// old way
// routes/videos.js
router.get("/", (req, res, next) => {
  media.getAll({
    lang: req.getLocale(),
    type: 1
  })
  .then((videos) => {
    res.render("videos", {
      videos
    });
  })
  .catch(next);
});

// new way .. to eliminate callback (.then) and to eliminate redundant code

// middleware/wrap.js
module.exports = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
// which changes this routing function to a simpler form vs the above
// routes/video.js
const wrap = require("../middleware/wrap");
router.get("/", wrap(async (req, res, next) => {
  let videos = await media.getAll({
    lang: req.getLocale(),
    type: 1
  });

  res.render("videos", {
    videos
  });
}));
