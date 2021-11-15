const rings = {
    EXTRA: {
        name: "extra",
        radialOffset: 300
    },
    OUTER: {
        name: "outer",
        radialOffset: 300
    },
    MIDDLE: {
        name: "middle",
        radialOffset: 200
    },
    INNER: {
        name: "inner",
        radialOffset: 100
    }
};

const randomOffsetScale = 5;
const randomAngleOffsetScale = 0.4

var images = {
    outer: [],
    extra: ["dorado","dara","barcelos","figuro","cadena"],
    middle: ["pic","city","vista","beans","ciudad","mami","papi"],
    inner: ["nowhere","bogota","fiona","providence","music"]
};

splayImages(rings.OUTER)
splayImages(rings.EXTRA)
splayImages(rings.MIDDLE)
splayImages(rings.INNER)

$("#display").click(() => {
    $("#display").css("display","none")
    $("#screen").css("display","none")
});

function splayImages(ring) {
    let step = 2 * Math.PI / images[ring.name].length;

    for (i = 0; i < images[ring.name].length; i++) {
        imageObject = createImageObject(`${ring.name}/${images[ring.name][i]}.jpg`);
        $(`#${ring.name}`).append(imageObject);
        images.outer.push(imageObject);
    
        let angle = i * step + random(randomAngleOffsetScale);
        let randomRadialOffset = ring.radialOffset + random(randomOffsetScale);
        var pos = {
            x: Math.cos(angle) * randomRadialOffset, 
            y: Math.sin(angle) * randomRadialOffset};
        console.log(ring.name)
        $(imageObject).css("transform", `translate(${pos.x - 60}px,${pos.y - 60}px) rotate(${angle + Math.PI/2}rad)`);
        $(imageObject).click((d) => {
            $("#display > img").attr("src",d.target.src)
            $("#display").css("display","block")
            $("#screen").css("display","block")
        })
    }

    var ringAngle = 0;
    let rotation = () => {
        ringAngle += 180;
        var realAngle = ringAngle % 360;
        if (ring == rings.MIDDLE)
            realAngle = -realAngle;
        $(`#${ring.name}`).css("transform", `translate(-50%, -50%) rotate(${realAngle}deg)`)
    }
    setInterval(rotation, 15000);
    rotation();
}

function createImageObject(name) {
    var obj = $("<div>", {class: "image-object"});
    var img = $("<img>", {src: `img/${name}`})
    obj.append(img);
    return obj;
}

function random(scale) {
    return (Math.random() - 0.5) * scale
}