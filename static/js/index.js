$(document).ready(function () {
  $("#iCatalogs").multiselect({
    allSelectedText: "All catalogs selected",
    nonSelectedText: "Please select catalogs",
    onChange: () => generateInstallLink(),
  });
  generateInstallLink();
});

function generateInstallLink() {
  const catalogsValue = $("#iCatalogs").val().join(",") || "";
  const catalogs = catalogsValue.length && catalogsValue;

  const rpdbValue = $("#iRPDB").val() || "";

  const rpdb = rpdbValue.length && rpdbValue;

  let configurationValue = [
    ["catalogs", catalogs],
    ["rpgb", ""],
  ];
  if (rpdbValue != "") {
    configurationValue.push(["rpdb", rpdb]);
  }
  configurationValue = configurationValue
    .filter(([_, value]) => value.length)
    .map(([key, value]) => key + "=" + value)
    .join("|");

  const configuration =
    configurationValue && configurationValue.length ? "/" + configurationValue : "";
  const location = window.location.host + "/c" + configuration + "/manifest.json";
  // navigator.clipboard.writeText("https://" + location);
  installLink.href = "stremio://" + location;
}
