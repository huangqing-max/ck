	let online = {
		server: "ttps://mapi.zx123.cn",
		cdn_server: "ttps://mapi.zx123.cn",
		version: 1,
		debug: false,
	}
	let dev = {
		server: "ttps://mapi.zx123.cn",
		cdn_server: "ttps://mapi.zx123.cn",
		version: 1,
		debug: true
	}
	
	let env = "dev"
	let config = null
	if (env === "online") {
		config = online
	} else {
		config = dev
	}
	
	// export
	export default config