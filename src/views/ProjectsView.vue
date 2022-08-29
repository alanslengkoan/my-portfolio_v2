<script setup>
  import Loading from './../components/Loading.vue';
</script>

<template>
  <section id="projects" class="p-4 bg-regal-dark text-light">
    <div class="container mx-auto">
      <h1 class="text-2xl text-center font-bold">Projects</h1>

      <div class="py-4 flex flex-wrap">
        <div class="w-full">
          <ul class="flex mb-0 list-none flex-wrap pt-3 pb-10 flex-row">
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a class="text-xs font-bold px-5 py-3 shadow-lg rounded block hover:cursor-pointer" v-on:click="toggleTabs(1)" v-bind:class="{'text-black bg-white': openTab !== 1, 'text-copy-tertiary bg-background-secondary': openTab === 1}">
                All
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a class="text-xs font-bold px-5 py-3 shadow-lg rounded block hover:cursor-pointer" v-on:click="toggleTabs(2)" v-bind:class="{ 'text-black bg-white': openTab !== 2, 'text-copy-tertiary bg-background-secondary': openTab === 2 }">
                Web
              </a>
            </li>
            <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a class="text-xs font-bold px-5 py-3 shadow-lg rounded block hover:cursor-pointer" v-on:click="toggleTabs(3)" v-bind:class="{ 'text-black bg-white': openTab !== 3, 'text-copy-tertiary bg-background-secondary': openTab === 3 }">
                Mobile
              </a>
            </li>
          </ul>
          <div class="relative flex place-items-center flex-col min-w-0 break-words w-full">
            <div class="flex-auto">
              <div class="tab-content tab-space">
                <!-- begin:: loading -->
                <div :class="loading ? 'hidden' : 'flex items-center justify-center h-screen'">
                  <Loading />
                </div>
                <!-- end:: loading -->
                <!-- begin:: all -->
                <div v-bind:class="{ 'hidden': openTab !== 1, 'block': openTab === 1 }">
                  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div @click="isOpen = true" v-for="row of all" :key="row.id_project"
                      v-on:click="getDetail(row.id_project)"
                      class="m-3 rounded-xl bg-white text-black overflow-hidden shadow-lg transform transition duration-500 hover:scale-110 cursor-pointer">
                      <img class="w-full h-auto rounded-t-xl" :src="row.image" :alt="row.title">
                      <div class="px-6 py-4">
                        <p class="text-sm text-justify">{{ row.category }}</p>
                        <h1 class="font-bold text-lg py-1">{{ row.title }}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end:: all -->
                <!-- begin:: web -->
                <div v-bind:class="{ 'hidden': openTab !== 2, 'block': openTab === 2 }">
                  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div @click="isOpen = true" v-for="row of web" :key="row.id_project"
                      v-on:click="getDetail(row.id_project)"
                      class="m-3 rounded-xl bg-white text-black overflow-hidden shadow-lg transform transition duration-500 hover:scale-110 cursor-pointer">
                      <img class="w-full h-auto rounded-t-xl" :src="row.image" :alt="row.title">
                      <div class="px-6 py-4">
                        <p class="text-sm text-justify">{{ row.category }}</p>
                        <h1 class="font-bold text-lg py-1">{{ row.title }}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end:: web -->
                <!-- begin:: mobile -->
                <div v-bind:class="{ 'hidden': openTab !== 3, 'block': openTab === 3 }">
                  <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div @click="isOpen = true" v-for="row of mobile" :key="row.id_project"
                      v-on:click="getDetail(row.id_project)"
                      class="m-3 rounded-xl bg-white text-black overflow-hidden shadow-lg transform transition duration-500 hover:scale-110 cursor-pointer">
                      <img class="w-full h-auto rounded-t-xl" :src="row.image" :alt="row.title">
                      <div class="px-6 py-4">
                        <p class="text-sm text-justify">{{ row.category }}</p>
                        <h1 class="font-bold text-lg py-1">{{ row.title }}</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end:: mobile -->
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  <transition enter-active-class="duration-500 ease-out" enter-from-class="transform opacity-0"
    enter-to-class="opacity-100" leave-active-class="duration-500 ease-in" leave-from-class="opacity-100"
    leave-to-class="transform opacity-0">
    <div v-show="isOpen" class="flex items-center justify-center w-full h-full fixed inset-0">
      <div class="w-full h-full text-black bg-white">
        <div class="flex items-center justify-between px-5 pt-5">
          <h3></h3>
          <svg @click="isOpen = false" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
            class="bi bi-x-lg hover:cursor-pointer" viewBox="0 0 16 16">
            <path
              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        </div>
        <div class="p-4">
          <!-- begin:: loading -->
          <div :class="loading_detail ? 'hidden' : 'flex items-center justify-center h-screen'">
            <Loading />
          </div>
          <!-- end:: loading -->
          <div class="container mx-auto">
            <h3 class="text-center font-bold text-sm lg:text-2xl ">{{ title }}</h3>
            <div class="mt-4 text-xs lg:text-sm">
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                <div class="space-y-4">
                  <p class="items-center">
                    <font-awesome-icon icon="fa-solid fa-list" />&nbsp;Category :&nbsp;
                    <span class="font-medium">{{ category }}</span>
                  </p>
                  <p class="items-center">
                    <font-awesome-icon icon="fa-solid fa-gears" />&nbsp;Stacks :&nbsp;
                    <span class="font-medium">{{ stacks }}</span>
                  </p>
                </div>
                <div class="space-y-4">
                  <p class="items-center">
                    <font-awesome-icon icon="fa-brands fa-github" />&nbsp;Github :&nbsp;
                    <span v-html="github"></span>
                  </p>
                  <p class="items-center">
                    <font-awesome-icon icon="fa-solid fa-laptop-code" />&nbsp;Link :&nbsp;
                    <span v-html="demo"></span>
                  </p>
                </div>
              </div>
              <p class="text-justify mt-6 mb-6">
                {{ description }}
              </p>
              <div class="flex items-center justify-center">
                <div class="w-full lg:w-3/4">
                  <div class="mx-auto relative slide">
                    <div class="carousel-indicators absolute bottom-0 flex h-24 w-full justify-center items-center">
                      <ol class="z-50 flex w-4/12 justify-center">
                        <li v-for="(img, i) in pictures" :key="i"
                          class="md:w-4 md:h-4 bg-gray-300 rounded-full cursor-pointer mx-2"></li>
                      </ol>
                    </div>
                    <div class="carousel-inner relative overflow-hidden w-full">
                      <div v-for="(img, i) in pictures" :id="`slide-${i}`" :key="i"
                        :class="`${active === i ? 'active' : 'left-full'}`"
                        class="carousel-item inset-0 relative w-full transform transition-all duration-500 ease-in-out">
                        <img class="w-full object-cover" :src="img" alt="portfolio image">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
  #projects {
    min-height: 100vh;
  }

  .left-full {
    left: -100%;
  }

  .carousel-item {
    float: left;
    position: relative;
    display: block;
    width: 100%;
    margin-right: -100%;
    backface-visibility: hidden;
  }

  .carousel-item.active {
    left: 0;
  }
</style>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        loading: false,
        loading_detail: false,
        openTab: 1,
        active: 0,
        isOpen: false,
        category: null,
        stacks: null,
        title: null,
        github: null,
        demo: null,
        description: null,
        pictures: [],
        all: [],
        web: [],
        mobile: [],
      }
    },
    methods: {
      toggleTabs: function (tabNumber) {
        this.openTab = tabNumber
      },
      getDetail: function (id_project) {
        axios
          .get(
            import.meta.env.VITE_END_POINT + '/api/project/detail/' + id_project)
          .then(response => (
            this.loading_detail = true,
            this.category = response.data.data.category,
            this.title = response.data.data.title,
            this.stacks = response.data.data.stacks,
            this.github = response.data.data.github,
            this.demo = response.data.data.demo,
            this.description = response.data.data.description,
            this.pictures = response.data.data.pictures
          ))
          .catch(error => console.log(error))

        this.loading_detail = false
        this.pictures = []
      }
    },
    mounted() {
      axios
        .get(
          import.meta.env.VITE_END_POINT + '/api/project/all')
        .then(response => (
          this.loading = true,
          this.all = response.data.data
        ))
        .catch(error => console.log(error))

      axios
        .get(
          import.meta.env.VITE_END_POINT + '/api/project/1')
        .then(response => (this.web = response.data.data))
        .catch(error => console.log(error))

      axios
        .get(
          import.meta.env.VITE_END_POINT + '/api/project/2')
        .then(response => (this.mobile = response.data.data))
        .catch(error => console.log(error))

      let i = 0;
      setInterval(() => {
        if (i > this.pictures.length - 1) {
          i = 0;
        }
        this.active = i;
        i++;
      }, 3000);
    }
  }
</script>