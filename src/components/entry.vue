<template>
	<div class="entries__item">
		<p class="entries__name">{{entry.name}}</p>
		<p class="entries__text">{{entry.text}}</p>
	</div>
</template>

<script>
	export default {
		name: "entrie",
		props: {
			entry: Object
		}
	}
</script>

<style scoped lang="scss">
	.entries {
		&__item {
			width: 50%;
			padding-right: 50px;
			margin-bottom: 25px;
		}
		@include media('sm') {
			&__item {
				width: 100%;
			}
		}
	}
</style>