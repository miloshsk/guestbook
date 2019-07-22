<template>
	<div class="container">
		<div class="entries">
			<div class="entries__list">
				<appEntry
						v-for="entry in displayedEntries"
						:key="entry.id"
						:entry="entry"
				/>
			</div>
		</div>
		<div class="pagination">
			<v-pagination
					v-model="page"
					:length="pages.length"
					:total-visible="5"
			></v-pagination>
		</div>
	</div>
</template>

<script>
	import entry from './entry';
	export default {
		name: "messagesList",
		components: {
			appEntry: entry
		},
		data() {
			return {
				entries: [],
				url: 'https://guest-book-ab475.firebaseio.com/entries.json',
				page: 1,
				perPage: 4,
				pages: []
			}
		},
		methods: {
			setPages () {
				let numberOfPages = Math.ceil(this.entries.length / this.perPage);
				for (let index = 1; index <= numberOfPages; index++) {
					this.pages.push(index);
				}
			},
			paginate (entries) {
				let page = this.page;
				let perPage = this.perPage;
				let from = (page * perPage) - perPage;
				let to = (page * perPage);
				return  entries.slice(from, to);
			}
		},
		computed: {
			displayedEntries () {
				return this.paginate(this.entries);
			}
		},
		watch: {
			entries () {
				this.setPages();
			}
		},
		mounted() {
			this.axios.get(this.url).then((response) => {
				const data = Object.keys(response.data).map(function(k) {
					return response.data[k]
				});
				this.entries = data.reverse();
			});
		}
	}
</script>

<style lang="scss">
	.entries {
		&__list {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 25px;
		}
	}
	.pagination {
		display: flex;
		justify-content: center;
		margin-bottom: 25px;
		padding: 0 10px;
	}
	.theme--light.v-pagination .v-pagination__item--active {
		background-color: $c-black !important;
	}
	@include media('xs') {
		.theme--light.v-pagination .v-pagination__item {
			min-width: 25px !important;
			height: 25px;
		}
	}

</style>