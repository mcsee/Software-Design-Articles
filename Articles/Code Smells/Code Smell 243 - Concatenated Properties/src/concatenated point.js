class Point {
    constructor(coordString) {
        this.coordString = coordString;
    }

    x() {
        const coords = this.coordString.split(',');
        if (coords.length !== 2) {
            throw new Error('Invalid coordinate string format');
        }
        return parseFloat(coords[0]);
    }

    y() {
        const coords = this.coordString.split(',');
        if (coords.length !== 2) {
            throw new Error('Invalid coordinate string format');
        }
        return parseFloat(coords[1]);
    }
}