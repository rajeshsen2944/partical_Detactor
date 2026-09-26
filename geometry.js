function isAtBoundary(lenght, scannerLenght, boundary) {
    return (lenght < boundary.p1 || (lenght + scannerLenght) >= boundary.p2);
}

function isParticalDetacted(particle, scanner) {

    let scStart = scanner.y;
    let scLength = scanner.height;

    let parStart = particle.y;
    let parLength = particle.height;

    if (scanner.dir === "vertical") {
        scStart = scanner.x;
        scLength = scanner.width;

        parStart = particle.x;
        parLength = particle.width;
    }

    const scLeft = scStart;
    const scRight = scStart + scLength;

    const parLeft = parStart;
    const parRight = parStart + parLength;

    return (!(scRight < parLeft || scLeft > parRight)) ? true : false;
}

function checkParticle(partical, scanner, num = 0) {
    if (num === partical.length) { return false; }
    return (isParticalDetacted(partical[num], scanner) || checkParticle(partical, scanner, ++num));
}
module.exports = {
    isAtBoundary,
    isParticalDetacted,
    checkParticle,
}