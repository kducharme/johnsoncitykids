<template>
  <div ref="filterArea" class="filters">
    <section class="filter">
      <article class="input" @click="filterByType()">
        <p class="placeholder">Type</p>
      </article>
      <article class="structure hide">
        <p v-for="type in types" :key="type" @click="filterResults(type)">{{ type }}</p>
      </article>
    </section>
  </div>
</template>


<script>
export default {
  components: {},
  data() {
    return {
      types: {
        one: "Playground",
        two: "Library",
      },
    };
  },
  methods: {
    filterByType() {
      const dropdown = document.querySelector(".structure");
      dropdown.classList.toggle("hide");

      const input = document.querySelector(".input");
      input.classList.toggle("input__active");
    },
    filterResults() {
      console.log("filter me");
    },
    showDropdown() {
      const structure = document.createElement("div");
      structure.classList.add("structure", "hide");

      //   users.forEach((user) => {
      //     const { id, name, title } = user;
      //     const option = document.createElement("div");
      //     option.addEventListener("click", () => selectOption(name));
      //     option.setAttribute("id", id);

      //     const n = document.createElement("h5");
      //     n.textContent = name;

      //     const t = document.createElement("p");
      //     t.textContent = `(${title})`;

      //     option.appendChild(n);
      //     option.appendChild(t);
      //     structure.appendChild(option);
      //   });
      return structure;
    },
    toggleDropdown() {
      const dropdown = document.querySelector(".structure");
      dropdown.classList.toggle("hide");

      const input = document.querySelector(".input");
      input.classList.toggle("input__active");
    },
    selectOption(name) {
      const text = document.querySelector(".placeholder");
      text.textContent = name;
      text.classList.add("input__selected");
      this.toggleDropdown();
    },
  },
  created() {},
};
</script>

<style lang="scss">
.filters {
  display: flex;
  flex-direction: row;
  padding: 16px 0;
  margin: 0 0 24px;
}

/* Input styling */
.input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #e2e2e2;
  border-radius: 24px;
  height: 36px;
  padding: 4px 16px;
  background-color: white;
}

.input__active {
  border: 2px solid #009478;
  margin: -1px;
  background: #fafafa;
}

.input__placeholder {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.input:hover {
  cursor: pointer;
}

.placeholder {
  color: var(--colorPlaceholder);
}

.input__selected {
  color: var(--colorPrimaryDark);
}

/* Dropdown styling */
.structure {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 200px;
  width: 280px;
  overflow: scroll;
  background-color: white;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  padding: 12px;
  z-index: 9999;
  position: absolute;
  margin-top: 16px;
  border: 1px solid #e2e2e2;
}

.structure > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
}

.structure > article:hover {
  background-color: var(--colorAccent);
  color: white;
  cursor: pointer;
}

.structure > article > h5 {
  font-weight: 600;
  margin-right: 4px;
}

.structure > article > p {
  font-weight: 400;
  font-size: 13px;
}

.hide {
  display: none;
}
</style>;
