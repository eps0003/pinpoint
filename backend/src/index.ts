import * as fs from "fs";
import IPinfoWrapper, { LruCache } from "node-ipinfo";
import Server from "./server";

try {
  const data = fs.readFileSync("config.json", "utf8");
  const config = JSON.parse(data);

  const ipinfoWrapper = new IPinfoWrapper(config.apiToken, new LruCache());

  for (const cfg of config.servers) {
    const server = new Server(
      cfg.address,
      cfg.port,
      cfg.rconPassword,
      config.reconnectTime
    );
    server.onTCPR(async (data) => {
      if (!data.startsWith("<pinpoint> ")) return;

      const [id, ip] = data.replace("<pinpoint> ", "").split(/\s+/g);

      if (!/^\d+$/.test(id)) {
        console.warn(`Invalid player ID: ${id}`);
        return;
      }

      if (!/^([0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip)) {
        console.warn("Invalid IP:", ip);
        return;
      }

      const ipInfo = await ipinfoWrapper.lookupIp(ip);
      if (ipInfo.countryCode && ipInfo.country && ipInfo.region) {
        let message = `getRules().set_string("${id} code",'${ipInfo.countryCode}');`;
        message += `getRules().set_string("${id} country",'${ipInfo.country}');`;
        message += `getRules().set_string("${id} region",'${ipInfo.region}');`;
        server.sendTCPR(message);
      }
    });
  }
} catch (err) {
  console.log("Error reading config.json");
  console.error(err);
}
