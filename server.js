import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']); // Forces Node.js to use Google & Cloudflare DNS