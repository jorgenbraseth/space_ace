
const cache = {};

const hc = document.getElementById("helperCanvas");



export function loadImage(gfx, colorIt = "#999999"){
  var cacheKey = gfx+colorIt;
  if(cache[cacheKey]){
    return cache[cacheKey]
  }
  var parser = new DOMParser();
  var data = [
    unescape(gfx).substring(0,gfx.indexOf(",")+1),
    unescape(gfx).substring(gfx.indexOf(",")+1)
  ];
  var xmlDoc = parser.parseFromString(data[1], "text/xml");
  var color = xmlDoc.getElementById("teamColor");
  if(color){
    color.style.fill = colorIt;
  }

  data[1] = new XMLSerializer().serializeToString(xmlDoc.documentElement);

  cache[cacheKey] = renderSvg(data[0]+data[1], 16,16);
  return cache[cacheKey];
}

function renderSvg(svg, w, h){
  var img = new Image();
  img.src = svg;

  hc.setAttribute("width",w);
  hc.setAttribute("height",h);

  const ctx = hc.getContext('2d');
  ctx.clearRect(0,0,w,h);
  ctx.drawImage(img,0,0,w,h);
  var imgdata = hc.toDataURL("image/png");

  var rimg = new Image();
  rimg.src = imgdata;
  return rimg;
}
