let array = [];

function generateArray() {
  const size = 12; 
  array = [];
  const container = document.getElementById("array-container");
  container.innerHTML = ""; 

  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 100) + 1;
    array.push(value);

    const box = document.createElement("div");
    box.classList.add("box");
    box.style.height = `${value * 3}px`; 
    box.textContent = value;
    container.appendChild(box);
  }
}


function highlightElement(index, className) {
  const boxes = document.querySelectorAll(".box");
  boxes[index].classList.add(className);
  setTimeout(() => {
    boxes[index].classList.remove(className);
  }, 300);
}

// Bubble Sort Algorithm
async function bubbleSort() {
  const boxes = document.querySelectorAll(".box");
  const delay = document.getElementById("speed").value;
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      highlightElement(j, "active");
      highlightElement(j + 1, "active");

      if (array[j] > array[j + 1]) {
        // Swap values
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        boxes[j].style.height = `${array[j] * 3}px`;
        boxes[j + 1].style.height = `${array[j + 1] * 3}px`;
        boxes[j].textContent = array[j];
        boxes[j + 1].textContent = array[j + 1];
        highlightElement(j, "swap");
        highlightElement(j + 1, "swap");
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  markSorted();
}

// Selection Sort Algorithm
async function selectionSort() {
  const boxes = document.querySelectorAll(".box");
  const delay = document.getElementById("speed").value;
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      highlightElement(j, "active");
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      // Swap values
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      boxes[i].style.height = `${array[i] * 3}px`;
      boxes[minIndex].style.height = `${array[minIndex] * 3}px`;
      boxes[i].textContent = array[i];
      boxes[minIndex].textContent = array[minIndex];
      highlightElement(i, "swap");
      highlightElement(minIndex, "swap");
    }
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  markSorted();
}

// Insertion Sort Algorithm
async function insertionSort() {
  const boxes = document.querySelectorAll(".box");
  const delay = document.getElementById("speed").value;
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      highlightElement(j, "active");
      array[j + 1] = array[j];
      boxes[j + 1].style.height = `${array[j + 1] * 3}px`;
      boxes[j + 1].textContent = array[j + 1];
      j = j - 1;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    array[j + 1] = key;
    boxes[j + 1].style.height = `${key * 3}px`;
    boxes[j + 1].textContent = key;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  markSorted();
}

// Merge Sort Algorithm
async function mergeSort() {
  const delay = document.getElementById("speed").value;
  async function merge(left, right, start, end) {
    const boxes = document.querySelectorAll(".box");
    let i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        array[k++] = left[i++];
      } else {
        array[k++] = right[j++];
      }
      boxes[k - 1].style.height = `${array[k - 1] * 3}px`;
      boxes[k - 1].textContent = array[k - 1];
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    while (i < left.length) {
      array[k++] = left[i++];
      boxes[k - 1].style.height = `${array[k - 1] * 3}px`;
      boxes[k - 1].textContent = array[k - 1];
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    while (j < right.length) {
      array[k++] = right[j++];
      boxes[k - 1].style.height = `${array[k - 1] * 3}px`;
      boxes[k - 1].textContent = array[k - 1];
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  async function sort(start, end) {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      await sort(start, mid);
      await sort(mid + 1, end);
      await merge(array.slice(start, mid + 1), array.slice(mid + 1, end + 1), start, end);
    }
  }

  await sort(0, array.length - 1);
  markSorted();
}

// Quick Sort Algorithm
async function quickSort() {
  const delay = document.getElementById("speed").value;

  async function partition(low, high) {
    const boxes = document.querySelectorAll(".box");
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      highlightElement(j, "active");
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        boxes[i].style.height = `${array[i] * 3}px`;
        boxes[j].style.height = `${array[j] * 3}px`;
        boxes[i].textContent = array[i];
        boxes[j].textContent = array[j];
        highlightElement(i, "swap");
        highlightElement(j, "swap");
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    boxes[i + 1].style.height = `${array[i + 1] * 3}px`;
    boxes[high].style.height = `${array[high] * 3}px`;
    boxes[i + 1].textContent = array[i + 1];
    boxes[high].textContent = array[high];
    highlightElement(i + 1, "swap");

    return i + 1;
  }

  async function sort(low, high) {
    if (low < high) {
      const pi = await partition(low, high);
      await sort(low, pi - 1);
      await sort(pi + 1, high);
    }
  }

  await sort(0, array.length - 1);
  markSorted();
}

// Heap Sort Algorithm
async function heapSort() {
  const delay = document.getElementById("speed").value;
  const boxes = document.querySelectorAll(".box");

  async function heapify(n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) largest = left;
    if (right < n && array[right] > array[largest]) largest = right;

    if (largest !== i) {
      [array[i], array[largest]] = [array[largest], array[i]];
      boxes[i].style.height = `${array[i] * 3}px`;
      boxes[largest].style.height = `${array[largest] * 3}px`;
      boxes[i].textContent = array[i];
      boxes[largest].textContent = array[largest];
      highlightElement(i, "swap");
      highlightElement(largest, "swap");
      await heapify(n, largest);
    }
  }

  async function sort() {
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
      await heapify(array.length, i);
    }

    for (let i = array.length - 1; i > 0; i--) {
      [array[0], array[i]] = [array[i], array[0]];
      boxes[0].style.height = `${array[0] * 3}px`;
      boxes[i].style.height = `${array[i] * 3}px`;
      boxes[0].textContent = array[0];
      boxes[i].textContent = array[i];
      highlightElement(0, "swap");
      highlightElement(i, "swap");
      await heapify(i, 0);
    }
  }

  await sort();
  markSorted();
}

// Mark all boxes as sorted
function markSorted() {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach(box => {
    box.classList.add("sorted");
  });
}

// Call to generate initial array when the page loads
generateArray();
