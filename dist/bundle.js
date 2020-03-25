/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_movie_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/movie-service */ "./src/services/movie-service.js");
/* harmony import */ var _models_movie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/movie */ "./src/models/movie.js");



const movieListHTML = document.getElementById("movie-list");
const actorsListHTML = document.getElementById("actors-list");

Object(_services_movie_service__WEBPACK_IMPORTED_MODULE_0__["getAllMovies"])().then((movies) => {
	movies.forEach((movie) => {
		movie.drawListItem(movieListHTML);
	});
});

const movieInput = document.getElementById("movie-input");
const movieButtonSearch = document.getElementById("movie-button");

movieButtonSearch.onclick = () => {
	const movieID = parseInt(movieInput.value);
	Object(_services_movie_service__WEBPACK_IMPORTED_MODULE_0__["getAllActorsInMovie"])(movieID)
		.then((actors) => {
			actorsListHTML.innerHTML = "Actors: ";
			actors.forEach((actor) => {
				actor.drawListItems(actorsListHTML);
			});
		})
		.catch((err) => alert(err));

	movieInput.value = "";
	actorsListHTML.innerHTML = " ";
};


/***/ }),

/***/ "./src/models/actor.js":
/*!*****************************!*\
  !*** ./src/models/actor.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Actor {
	constructor(name, surname) {
		this.name = name;
		this.surname = surname;
	}

	drawListItems(host) {
		const movieListItem = document.createElement("li");
		movieListItem.innerHTML = this.name + " " + this.surname;
		host.appendChild(movieListItem);
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Actor);


/***/ }),

/***/ "./src/models/movie.js":
/*!*****************************!*\
  !*** ./src/models/movie.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Movie; });
class Movie {
	constructor(id, title, realeseYear) {
		this.id = id;
		this.title = title;
		this.realeseYear = realeseYear;
	}

	drawListItem(host) {
		const movieListItem = document.createElement("li");
		movieListItem.innerHTML =
			this.id + " - " + this.title + " (realsed " + this.realeseYear + ")";
		host.appendChild(movieListItem);
	}
}


/***/ }),

/***/ "./src/services/movie-service.js":
/*!***************************************!*\
  !*** ./src/services/movie-service.js ***!
  \***************************************/
/*! exports provided: getAllMovies, getAllActorsInMovie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllMovies", function() { return getAllMovies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllActorsInMovie", function() { return getAllActorsInMovie; });
/* harmony import */ var _models_actor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/actor */ "./src/models/actor.js");
/* harmony import */ var _models_movie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/movie */ "./src/models/movie.js");



const DATA_BASE_URL = "http://localhost:3000/";

async function getAllMovies() {
	let movies = [];
	const moviesResponse = await fetch(DATA_BASE_URL + "movies");
	const moviesArray = await moviesResponse.json();
	moviesArray.map((movie) => {
		const newMovie = new _models_movie__WEBPACK_IMPORTED_MODULE_1__["default"](
			movie["id"],
			movie["title"],
			movie["realse-year"]
		);
		movies.push(newMovie);
	});
	return movies;
}

async function getAllActorsInMovie(moveID) {
	const specificMovie = "movies/" + moveID;

	const movieDetails = await getMovieDetailsJSON(specificMovie);

	const actorIDs = Object.values(movieDetails["actors"]).map((value) =>
		parseInt(value)
	);

	let allActorsPromise = actorIDs.map((id) => getActorDetailsJSON(id));

	let allActors = await Promise.all(allActorsPromise);
	allActors = allActors.map(
		(actor) => new _models_actor__WEBPACK_IMPORTED_MODULE_0__["default"](actor["ime"], actor["prezime"])
	);

	return allActors;
}

async function getMovieDetailsJSON(specificMovie) {
	let movieDetails;
	try {
		let movieDetailsResponse = await fetch(DATA_BASE_URL + specificMovie);
		if (movieDetailsResponse.status === 404) throw "Movie not found";
		if (!movieDetailsResponse.ok) throw "Server side error";
		movieDetails = await movieDetailsResponse.json();
	} catch (err) {
		throw err;
	}
	return movieDetails;
}

async function getActorDetailsJSON(actorID) {
	const specificActor = "actors/" + actorID;
	const actorDetailsPromise = await fetch(DATA_BASE_URL + specificActor);
	const actorDetails = actorDetailsPromise.json();
	return actorDetails;
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tb2RlbHMvYWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZGVscy9tb3ZpZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXMvbW92aWUtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUE2RTtBQUMxQzs7QUFFbkM7QUFDQTs7QUFFQSw0RUFBWTtBQUNaO0FBQ0E7QUFDQSxFQUFFO0FBQ0YsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDLG1GQUFtQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDNUJBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsb0VBQUssRUFBQzs7Ozs7Ozs7Ozs7OztBQ2JyQjtBQUFBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDYkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFvQztBQUNBOztBQUVwQzs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFEQUFLO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLHFEQUFLO0FBQ3RCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3RcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgeyBnZXRBbGxNb3ZpZXMsIGdldEFsbEFjdG9yc0luTW92aWUgfSBmcm9tIFwiLi9zZXJ2aWNlcy9tb3ZpZS1zZXJ2aWNlXCI7XHJcbmltcG9ydCBNb3ZpZSBmcm9tIFwiLi9tb2RlbHMvbW92aWVcIjtcclxuXHJcbmNvbnN0IG1vdmllTGlzdEhUTUwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdmllLWxpc3RcIik7XHJcbmNvbnN0IGFjdG9yc0xpc3RIVE1MID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhY3RvcnMtbGlzdFwiKTtcclxuXHJcbmdldEFsbE1vdmllcygpLnRoZW4oKG1vdmllcykgPT4ge1xyXG5cdG1vdmllcy5mb3JFYWNoKChtb3ZpZSkgPT4ge1xyXG5cdFx0bW92aWUuZHJhd0xpc3RJdGVtKG1vdmllTGlzdEhUTUwpO1xyXG5cdH0pO1xyXG59KTtcclxuXHJcbmNvbnN0IG1vdmllSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdmllLWlucHV0XCIpO1xyXG5jb25zdCBtb3ZpZUJ1dHRvblNlYXJjaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW92aWUtYnV0dG9uXCIpO1xyXG5cclxubW92aWVCdXR0b25TZWFyY2gub25jbGljayA9ICgpID0+IHtcclxuXHRjb25zdCBtb3ZpZUlEID0gcGFyc2VJbnQobW92aWVJbnB1dC52YWx1ZSk7XHJcblx0Z2V0QWxsQWN0b3JzSW5Nb3ZpZShtb3ZpZUlEKVxyXG5cdFx0LnRoZW4oKGFjdG9ycykgPT4ge1xyXG5cdFx0XHRhY3RvcnNMaXN0SFRNTC5pbm5lckhUTUwgPSBcIkFjdG9yczogXCI7XHJcblx0XHRcdGFjdG9ycy5mb3JFYWNoKChhY3RvcikgPT4ge1xyXG5cdFx0XHRcdGFjdG9yLmRyYXdMaXN0SXRlbXMoYWN0b3JzTGlzdEhUTUwpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pXHJcblx0XHQuY2F0Y2goKGVycikgPT4gYWxlcnQoZXJyKSk7XHJcblxyXG5cdG1vdmllSW5wdXQudmFsdWUgPSBcIlwiO1xyXG5cdGFjdG9yc0xpc3RIVE1MLmlubmVySFRNTCA9IFwiIFwiO1xyXG59O1xyXG4iLCJjbGFzcyBBY3RvciB7XHJcblx0Y29uc3RydWN0b3IobmFtZSwgc3VybmFtZSkge1xyXG5cdFx0dGhpcy5uYW1lID0gbmFtZTtcclxuXHRcdHRoaXMuc3VybmFtZSA9IHN1cm5hbWU7XHJcblx0fVxyXG5cclxuXHRkcmF3TGlzdEl0ZW1zKGhvc3QpIHtcclxuXHRcdGNvbnN0IG1vdmllTGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcblx0XHRtb3ZpZUxpc3RJdGVtLmlubmVySFRNTCA9IHRoaXMubmFtZSArIFwiIFwiICsgdGhpcy5zdXJuYW1lO1xyXG5cdFx0aG9zdC5hcHBlbmRDaGlsZChtb3ZpZUxpc3RJdGVtKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFjdG9yO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNb3ZpZSB7XHJcblx0Y29uc3RydWN0b3IoaWQsIHRpdGxlLCByZWFsZXNlWWVhcikge1xyXG5cdFx0dGhpcy5pZCA9IGlkO1xyXG5cdFx0dGhpcy50aXRsZSA9IHRpdGxlO1xyXG5cdFx0dGhpcy5yZWFsZXNlWWVhciA9IHJlYWxlc2VZZWFyO1xyXG5cdH1cclxuXHJcblx0ZHJhd0xpc3RJdGVtKGhvc3QpIHtcclxuXHRcdGNvbnN0IG1vdmllTGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XHJcblx0XHRtb3ZpZUxpc3RJdGVtLmlubmVySFRNTCA9XHJcblx0XHRcdHRoaXMuaWQgKyBcIiAtIFwiICsgdGhpcy50aXRsZSArIFwiIChyZWFsc2VkIFwiICsgdGhpcy5yZWFsZXNlWWVhciArIFwiKVwiO1xyXG5cdFx0aG9zdC5hcHBlbmRDaGlsZChtb3ZpZUxpc3RJdGVtKTtcclxuXHR9XHJcbn1cclxuIiwiaW1wb3J0IEFjdG9yIGZyb20gXCIuLi9tb2RlbHMvYWN0b3JcIjtcclxuaW1wb3J0IE1vdmllIGZyb20gXCIuLi9tb2RlbHMvbW92aWVcIjtcclxuXHJcbmNvbnN0IERBVEFfQkFTRV9VUkwgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9cIjtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBbGxNb3ZpZXMoKSB7XHJcblx0bGV0IG1vdmllcyA9IFtdO1xyXG5cdGNvbnN0IG1vdmllc1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2goREFUQV9CQVNFX1VSTCArIFwibW92aWVzXCIpO1xyXG5cdGNvbnN0IG1vdmllc0FycmF5ID0gYXdhaXQgbW92aWVzUmVzcG9uc2UuanNvbigpO1xyXG5cdG1vdmllc0FycmF5Lm1hcCgobW92aWUpID0+IHtcclxuXHRcdGNvbnN0IG5ld01vdmllID0gbmV3IE1vdmllKFxyXG5cdFx0XHRtb3ZpZVtcImlkXCJdLFxyXG5cdFx0XHRtb3ZpZVtcInRpdGxlXCJdLFxyXG5cdFx0XHRtb3ZpZVtcInJlYWxzZS15ZWFyXCJdXHJcblx0XHQpO1xyXG5cdFx0bW92aWVzLnB1c2gobmV3TW92aWUpO1xyXG5cdH0pO1xyXG5cdHJldHVybiBtb3ZpZXM7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBbGxBY3RvcnNJbk1vdmllKG1vdmVJRCkge1xyXG5cdGNvbnN0IHNwZWNpZmljTW92aWUgPSBcIm1vdmllcy9cIiArIG1vdmVJRDtcclxuXHJcblx0Y29uc3QgbW92aWVEZXRhaWxzID0gYXdhaXQgZ2V0TW92aWVEZXRhaWxzSlNPTihzcGVjaWZpY01vdmllKTtcclxuXHJcblx0Y29uc3QgYWN0b3JJRHMgPSBPYmplY3QudmFsdWVzKG1vdmllRGV0YWlsc1tcImFjdG9yc1wiXSkubWFwKCh2YWx1ZSkgPT5cclxuXHRcdHBhcnNlSW50KHZhbHVlKVxyXG5cdCk7XHJcblxyXG5cdGxldCBhbGxBY3RvcnNQcm9taXNlID0gYWN0b3JJRHMubWFwKChpZCkgPT4gZ2V0QWN0b3JEZXRhaWxzSlNPTihpZCkpO1xyXG5cclxuXHRsZXQgYWxsQWN0b3JzID0gYXdhaXQgUHJvbWlzZS5hbGwoYWxsQWN0b3JzUHJvbWlzZSk7XHJcblx0YWxsQWN0b3JzID0gYWxsQWN0b3JzLm1hcChcclxuXHRcdChhY3RvcikgPT4gbmV3IEFjdG9yKGFjdG9yW1wiaW1lXCJdLCBhY3RvcltcInByZXppbWVcIl0pXHJcblx0KTtcclxuXHJcblx0cmV0dXJuIGFsbEFjdG9ycztcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0TW92aWVEZXRhaWxzSlNPTihzcGVjaWZpY01vdmllKSB7XHJcblx0bGV0IG1vdmllRGV0YWlscztcclxuXHR0cnkge1xyXG5cdFx0bGV0IG1vdmllRGV0YWlsc1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2goREFUQV9CQVNFX1VSTCArIHNwZWNpZmljTW92aWUpO1xyXG5cdFx0aWYgKG1vdmllRGV0YWlsc1Jlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB0aHJvdyBcIk1vdmllIG5vdCBmb3VuZFwiO1xyXG5cdFx0aWYgKCFtb3ZpZURldGFpbHNSZXNwb25zZS5vaykgdGhyb3cgXCJTZXJ2ZXIgc2lkZSBlcnJvclwiO1xyXG5cdFx0bW92aWVEZXRhaWxzID0gYXdhaXQgbW92aWVEZXRhaWxzUmVzcG9uc2UuanNvbigpO1xyXG5cdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0dGhyb3cgZXJyO1xyXG5cdH1cclxuXHRyZXR1cm4gbW92aWVEZXRhaWxzO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRBY3RvckRldGFpbHNKU09OKGFjdG9ySUQpIHtcclxuXHRjb25zdCBzcGVjaWZpY0FjdG9yID0gXCJhY3RvcnMvXCIgKyBhY3RvcklEO1xyXG5cdGNvbnN0IGFjdG9yRGV0YWlsc1Byb21pc2UgPSBhd2FpdCBmZXRjaChEQVRBX0JBU0VfVVJMICsgc3BlY2lmaWNBY3Rvcik7XHJcblx0Y29uc3QgYWN0b3JEZXRhaWxzID0gYWN0b3JEZXRhaWxzUHJvbWlzZS5qc29uKCk7XHJcblx0cmV0dXJuIGFjdG9yRGV0YWlscztcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9