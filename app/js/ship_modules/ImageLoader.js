
export function loadImage(gfx, colorIt = "#999999"){
  var parser = new DOMParser();
  var data = [
    unescape(gfx).substring(0,gfx.indexOf(",")+1),
    unescape(gfx).substring(gfx.indexOf(",")+1)
  ];
  var xmlDoc = parser.parseFromString(data[1], "text/xml");
  var color = xmlDoc.getElementById("teamColor");
  color.style.fill = colorIt;

  data[1] = new XMLSerializer().serializeToString(xmlDoc.documentElement);

  var img = new Image();
  img.src = data[0]+data[1];

  return img;
}
