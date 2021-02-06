#!/usr/bin/env node

const si = require("systeminformation");
const prompts = require("prompts");
const clear = require("clear");

const log = console.log;

// Main Async Func
(async () => {
  // Called if user says yes
  const userAccept = () => {
    // Stuff to get
    let valueObject = {
      cpu: "manufacturer,brand, speed, cores, physicalCores, processors",
      osInfo:
        "platform, distro, release, codename, kernel, arch, hostname, codepage",
      mem: "total, free, used, active, available",
      currentLoad: "avgload, currentload, currentload_idle, raw_currentload",
    };

    si.get(valueObject).then(function (data) {
      let systemVals = data;

      log("  ");
      log(
        `💻 CPU:\nManufacturer: ${systemVals.cpu.manufacturer} \nBrand: ${systemVals.cpu.brand} \nSpeed: ${systemVals.cpu.speed} \nCores: ${systemVals.cpu.cores} \nPhsysicalCores: ${systemVals.cpu.physicalCores} \nProcessor: ${systemVals.cpu.processors}`
      );
      log("  ");
      log(
        `📀 OS: \nPlatform: ${systemVals.osInfo.platform} \nDistro: ${systemVals.osInfo.distro} \nRelease: ${systemVals.osInfo.release} \nCodename: ${systemVals.osInfo.codename} \nKernel: ${systemVals.osInfo.kernel} \nArch: ${systemVals.osInfo.arch} \nHostname: ${systemVals.osInfo.hostname} \nCodepage: ${systemVals.osInfo.codepage}`
      );
      log("  ");
      log(
        `💾 Memory: \nTotal: ${systemVals.mem.total} \nFree: ${systemVals.mem.free} \nUsed: ${systemVals.mem.used} \nActive: ${systemVals.mem.active} \nAvailable: ${systemVals.mem.available}`
      );
      log("  ");
      log(
        `🔌 Load: \nAverageLoad: ${systemVals.currentLoad.avgload} \nCurrentLoad: ${systemVals.currentLoad.currentload} \nIdleCurrentLoad: ${systemVals.currentLoad.currentload_idle} \nRawCurrentLoad: ${systemVals.currentLoad.raw_currentload}`
      );
      log("  ");
    });

    return true;
  };

  // Called if user says no
  const userDecline = () => {
    clear();
    return true;
  };

  // Code for the prompt
  const response = await prompts({
    type: "text",
    name: "value",
    message: "View SysInfo ? (y/n)",
    validate: (value) =>
      value == "y" || value == "Y" ? userAccept() : userDecline(),
  });
})();