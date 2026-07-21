const mongoose = require('mongoose');

const Tour = mongoose.model("Tour", {
    name: String, // Trong bản ghi có phần nào thì trong này phải có phần đó 
    vehicle: String
}); 

module.exports = Tour;