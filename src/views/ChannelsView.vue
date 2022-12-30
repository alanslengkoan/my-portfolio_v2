<script setup>
    import Loading from './../components/Loading.vue';
</script>

<template>
    <section id="channels">
        <div class="container mx-auto">
            <h1 class="text-2xl text-center font-bold">Channels</h1>

            <div v-for="(row, i) in profil" :key="i">
                <div class="py-4 flex flex-wrap items-center">
                    <div class="grow-0 shrink-0 basis-auto block w-full lg:w-6/12 xl:w-4/12">
                        <div class="my-auto">
                            <h1 class="py-2 font-bold text-xl text-center">{{ row.name }}</h1>
                            <img class="py-2 px-2 mx-auto rounded-full" :src="row.image" :alt="row.name">
                        </div>
                    </div>
                    <div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
                        <div class="py-4 flex place-items-center flex-col">
                            <div class="gap-6 grid lg:grid-cols-2">
                                <div class="mx-2 my-2">
                                    <iframe src="https://www.youtube.com/embed/dG7zuJ9JS-0?rel=0"
                                        allowfullscreen></iframe>
                                    <h3 class="font-semibold pt-3 text-lg">Judul</h3>
                                    <p class="font-semibold text-xs italic">22-22-2222</p>
                                </div>
                                <div class="mx-2 my-2">
                                    <iframe src="https://www.youtube.com/embed/dG7zuJ9JS-0?rel=0"
                                        allowfullscreen></iframe>
                                </div>
                                <div class="mx-2 my-2">
                                    <iframe src="https://www.youtube.com/embed/dG7zuJ9JS-0?rel=0"
                                        allowfullscreen></iframe>
                                </div>
                                <div class="mx-2 my-2">
                                    <iframe src="https://www.youtube.com/embed/dG7zuJ9JS-0?rel=0"
                                        allowfullscreen></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
    #channels {
        min-height: 100vh;
    }
</style>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                loading: false,
                profil: [],
                channelId: [
                    'UCpSPS5yLCxYRuZSrCx-eBjA',
                    'UCnrZ-UFSzeMSxKx_OHtwKsQ',
                    'UCzyuZJ8zZ-Lhfnz41DG5qLw',
                    'UCkXmLjEr95LVtGuIm3l2dPg',
                    'UCfzlCWGWYyIQ0aLC5w48gBQ',
                    'UCW5YeuERMmlnqo4oq8vwUpg',
                    'UC14ZKB9XsDZbnHVmr4AmUpQ'
                ]
            }
        },
        methods: {
            getProfil: function (id) {
                let urlProfil = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=AIzaSyCs-j3dW1uwPLFOp2KsDzd7CGRCX7-6dgA`;
                let urlVideos = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&order=date&channelId=${id}&key=AIzaSyCs-j3dW1uwPLFOp2KsDzd7CGRCX7-6dgA`;

                let arrProfil = [];
                let arrVideos = [];

                axios.get(urlProfil)
                    .then(response => (
                        arrProfil.push({
                            name: response.data.items[0].snippet.title,
                            image: response.data.items[0].snippet.thumbnails.medium.url,
                        })
                    )).catch(error => console.log(error))

                axios.get(urlVideos)
                    .then(response => (
                        arrVideos.push({
                            videos: response.data.items[0].id.videoId,
                            title: response.data.items[0].snippet.title,
                            publishedAt: response.data.items[0].snippet.publishedAt,
                        })
                    )).catch(error => console.log(error))



                console.log(arrProfil);
                console.log(arrVideos);
            },
        },
        mounted() {
            this.channelId.map((value, key) => {
                this.getProfil(value)
            })
        }
    }
</script>