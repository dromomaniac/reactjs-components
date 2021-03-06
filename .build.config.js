var srcFolder = "./src";
var docsFolder = "./docs";
var docsSrc = docsFolder + "/src";
var docsDist = docsFolder + "/dist";

var dirs = {
  srcJS: srcFolder,
  srcCSS: srcFolder,
  docs: {
    src: docsSrc,
    dist: docsDist,
    srcFonts: docsSrc + "/fonts",
    distFonts: docsDist + "/fonts",
    srcJS: docsSrc,
    distJS: docsDist,
    srcCSS: docsFolder + "/styles",
    distCSS: docsDist + "/"
  }
};

var files = {
  docs: {
    srcJS: dirs.docs.srcJS + "/index.js",
    distJS: dirs.docs.distJS + "/index.js",
    srcCSS: dirs.docs.srcCSS + "/index.less",
    distCSS: dirs.docs.distCSS + "/index.css",
    srcFonts: dirs.docs.srcFonts + "/**/*",
    srcHTML: dirs.docs.src + "/index.html",
    distHTML: dirs.docs.dist + "/index.html"
  }
};

module.exports = {
  dirs: dirs,
  files: files
};
