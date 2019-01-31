<template>
	<div>
		<b-navbar type="dark" variant="dark" toggleable class="dark-footer">
			<b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
			<b-collapse is-nav id="nav_dropdown_collapse">
				<b-navbar-nav>
					<b-nav-item href="#">На главный сайт</b-nav-item>
					<b-nav-item href="#">Регистрация</b-nav-item>
					<b-nav-item href="#">Документы</b-nav-item>
					<b-nav-item href="#">Правила</b-nav-item>
					<b-nav-item href="#">О компании</b-nav-item>
				</b-navbar-nav>
				<b-navbar-nav class="ml-auto">
					<b-navbar-brand href="#" class="mr-0">
						<i class="fab fa-facebook-square nav-link"></i>
					</b-navbar-brand>
					<b-navbar-brand href="#" class="mr-0">
						<i class="fab fa-vk nav-link"></i>
					</b-navbar-brand>
					<b-navbar-brand href="#" class="mr-0">
						<i class="fab fa-youtube-square nav-link"></i>
					</b-navbar-brand>
					<b-navbar-brand href="#" class="mr-0">
						<i class="fab fa-instagram nav-link"></i>
					</b-navbar-brand>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
    export default {
        name: "footerBar"
    }
</script>

<style scoped>

</style>