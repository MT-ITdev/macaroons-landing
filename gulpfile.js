const { src, dest, watch, series } = require('gulp');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

// Путь к исходным LESS-файлам
const lessFiles = 'css/*.less';

// Путь для сохранения скомпилированных CSS
const cssDest = 'dist';

const outputFileName = 'style.css'

// Задача компиляции LESS
function compileLess() {
    return src(lessFiles)
        .pipe(sourcemaps.init())     // Инициализация sourcemaps
        .pipe(less())                // Компиляция LESS в CSS
        .pipe (concat (outputFileName))   // Объединение в оин файл
        .pipe(sourcemaps.write('.')) // Запись sourcemaps рядом с CSS
        .pipe(dest(cssDest));        // Сохранение CSS
}

// Задача отслеживания изменений в LESS-файлах
function watchFiles() {
    watch(lessFiles, compileLess);
}

// Экспорт задач
exports.default = series(compileLess, watchFiles);
