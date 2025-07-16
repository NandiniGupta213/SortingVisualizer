const sizeSlider = document.getElementById("sizeSlider");
const speedSlider = document.getElementById('speedSlider');


let currentArray = generateArray(parseInt(sizeSlider.value));
generateBars(currentArray); 
function getSpeedDelay() {
  const speed = parseInt(speedSlider.value); 
  return 1000 / speed;
}


function generateArray(size){
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 10));
  }
  console.log(arr);
  return arr;
}


function generateBars(array){
    const container = document.querySelector('.bars');
    container.innerHTML = ''; 

  const barWidth = Math.min(1000 / array.length, 40);
   array.forEach((value) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
   bar.style.height = `${Math.max(value*30, 20)}px`;
    bar.style.width = `${barWidth}px`;
    const label = document.createElement('div');
    label.className = 'bar-label';
    label.innerText = value;

    bar.appendChild(label);
    container.appendChild(bar);
  });
}


sizeSlider.addEventListener('input', () => {
  const size = parseInt(sizeSlider.value);
  currentArray= generateArray(size);
  generateBars(currentArray);
});

document.getElementById("newArrayBtn").addEventListener("click", () => {
  const size = parseInt(sizeSlider.value);
  currentArray = generateArray(size); 
  generateBars(currentArray);
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const complexities = {
  bubble: {
    time: { best: "O(n)", avg: "O(n²)", worst: "O(n²)" },
    space: "O(1)"
  },
  selection: {
    time: { best: "O(n²)", avg: "O(n²)", worst: "O(n²)" },
    space: "O(1)"
  },
  insertion: {
    time: { best: "O(n)", avg: "O(n²)", worst: "O(n²)" },
    space: "O(1)"
  },
  merge: {
    time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n log n)" },
    space: "O(n)"
  },
  quick: {
    time: { best: "O(n log n)", avg: "O(n log n)", worst: "O(n²)" },
    space: "O(log n)"
  }
};

let currentAlgorithm = null;

document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

   

    currentAlgorithm = link.id;

    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');

    const info = complexities[currentAlgorithm];
   if (info) {
      document.getElementById("time-best").textContent = info.time.best;
      document.getElementById("time-avg").textContent = info.time.avg;
      document.getElementById("time-worst").textContent = info.time.worst;
      document.getElementById("space-worst").textContent = info.space;
    } else {
      console.warn("No complexity info found for:", currentAlgorithm);
    }
  });
});


document.getElementById("startBtn").addEventListener("click", () => {
  if (!currentAlgorithm) {
    alert("Please select a sorting algorithm first.");
    return;
  }

  switch (currentAlgorithm) {
    case "bubble":
      bubbleSort(currentArray);
      break;
    case "selection":
      selectionSort(currentArray);
      break;
    case "insertion":
      insertionSort(currentArray);
      break;
    case "merge":
      mergeSort(currentArray,0,currentArray.length);
      break;
    case "quick":
      quickSort(currentArray, 0, currentArray.length - 1);
      break;
  }
});

async function bubbleSort(array) {
  const bars = document.querySelectorAll('.bar');
  const delay = getSpeedDelay();

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.background = 'orange';
      bars[j + 1].style.background = 'orange';

      await sleep(delay);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        bars[j].style.height = `${Math.max(array[j] * 30, 20)}px`;
        bars[j].querySelector('.bar-label').textContent = array[j];
        bars[j + 1].style.height = `${Math.max(array[j + 1] * 30, 20)}px`;
        bars[j + 1].querySelector('.bar-label').textContent = array[j + 1];
      }

      bars[j].style.background = '';
      bars[j + 1].style.background = '';
    }

    bars[array.length - 1 - i].style.background = 'lime';
  }

  bars[0].style.background = 'lime';
}

async function selectionSort(array) {
  const bars = document.querySelectorAll('.bar');
  const delay = getSpeedDelay();

  for (let i = 0; i < array.length; i++) {
    let minIdx = i;
    bars[minIdx].style.background = 'orange';

    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.background = 'orange';
      await sleep(delay);

      if (array[j] < array[minIdx]) {
        bars[minIdx].style.background = ''; // reset old min
        minIdx = j;
        bars[minIdx].style.background = 'orange';
      } else {
        bars[j].style.background = '';
      }
    }

    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];

      bars[i].style.height = `${Math.max(array[i] * 30, 20)}px`;
      bars[i].querySelector('.bar-label').textContent = array[i];
      bars[minIdx].style.height = `${Math.max(array[minIdx] * 30, 20)}px`;
      bars[minIdx].querySelector('.bar-label').textContent = array[minIdx];
    }

    bars[minIdx].style.background = '';
    bars[i].style.background = 'lime';
    await sleep(delay);
  }
}

async function insertionSort(array) {
  const bars = document.querySelectorAll('.bar');
  const delay = getSpeedDelay();

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    bars[i].style.background = 'orange';
    await sleep(delay);

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];

      bars[j + 1].style.height = `${Math.max(array[j + 1] * 30, 20)}px`;
      bars[j + 1].querySelector('.bar-label').textContent = array[j + 1];
      bars[j].style.background = 'orange';

      await sleep(delay);
      bars[j].style.background = '';
      j--;
    }

    array[j + 1] = key;
    bars[j + 1].style.height = `${Math.max(key * 30, 20)}px`;
    bars[j + 1].querySelector('.bar-label').textContent = key;

    bars[i].style.background = '';
  }

  for (let i = 0; i < array.length; i++) {
    bars[i].style.background = 'lime';
    await sleep(10);
  }
}

async function quickSort(array, low = 0, high = array.length - 1) {
  if (low < high) {
    let pi = await partition(array, low, high);
    await quickSort(array, low, pi - 1);
    await quickSort(array, pi + 1, high);
  } else if (low === high) {
    document.querySelectorAll('.bar')[low].style.background = 'lime';
  }
}

async function partition(array, low, high) {
  const bars = document.querySelectorAll('.bar');
  const delay = getSpeedDelay();

  let pivot = array[high];
  let i = low - 1;

  bars[high].style.background = 'orange';

  for (let j = low; j < high; j++) {
    bars[j].style.background = 'orange';
    await sleep(delay);

    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];

      bars[i].style.height = `${Math.max(array[i] * 30, 20)}px`;
      bars[i].querySelector('.bar-label').textContent = array[i];
      bars[j].style.height = `${Math.max(array[j] * 30, 20)}px`;
      bars[j].querySelector('.bar-label').textContent = array[j];
    }

    bars[j].style.background = '';
  }

  [array[i + 1], array[high]] = [array[high], array[i + 1]];

  bars[i + 1].style.height = `${Math.max(array[i + 1] * 30, 20)}px`;
  bars[i + 1].querySelector('.bar-label').textContent = array[i + 1];
  bars[high].style.height = `${Math.max(array[high] * 30, 20)}px`;
  bars[high].querySelector('.bar-label').textContent = array[high];

  bars[high].style.background = '';
  bars[i + 1].style.background = 'lime';

  return i + 1;
}

async function mergeSort(array, left = 0, right = array.length - 1) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  await mergeSort(array, left, mid);
  await mergeSort(array, mid + 1, right);
  await merge(array, left, mid, right);
}

async function merge(array, left, mid, right) {
  const delay = getSpeedDelay();
  const bars = document.querySelectorAll('.bar');

  const leftArr = array.slice(left, mid + 1);
  const rightArr = array.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    bars[k].style.background = 'orange';

    await sleep(delay);

    if (leftArr[i] <= rightArr[j]) {
      array[k] = leftArr[i++];
    } else {
      array[k] = rightArr[j++];
    }

    bars[k].style.height = `${Math.max(array[k] * 30, 20)}px`;
    bars[k].querySelector('.bar-label').textContent = array[k];
    bars[k].style.background = 'lime';
    k++;
  }

  while (i < leftArr.length) {
    array[k] = leftArr[i++];
    bars[k].style.height = `${Math.max(array[k] * 30, 20)}px`;
    bars[k].querySelector('.bar-label').textContent = array[k];
    bars[k].style.background = 'lime';
    k++;
    await sleep(delay);
  }

  while (j < rightArr.length) {
    array[k] = rightArr[j++];
    bars[k].style.height = `${Math.max(array[k] * 30, 20)}px`;
    bars[k].querySelector('.bar-label').textContent = array[k];
    bars[k].style.background = 'lime';
    k++;
    await sleep(delay);
  }
}


