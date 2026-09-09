import { useMemo } from "react";
import { locations } from "../api/locations";

const LocationSelector = ({ register, setValue, watch, errors }) => {
  const province = watch("detailLocation.province") || "Mendoza";
  const region = watch("detailLocation.region") || "";
  const city = watch("detailLocation.city") || "";

  const availableRegions = useMemo(
    () => (province ? Object.keys(locations[province] || {}) : []),
    [province],
  );

  const availableCities = useMemo(
    () => (province && region ? locations[province]?.[region] || [] : []),
    [province, region],
  );

  const handleProvinceChange = (e) => {
    const newProvince = e.target.value;
    const regions = Object.keys(locations[newProvince] || {});
    const newRegion = regions[0] || "";
    const cities = newRegion ? locations[newProvince]?.[newRegion] || [] : [];

    setValue("detailLocation.province", newProvince);
    setValue("detailLocation.region", newRegion);
    setValue("detailLocation.city", cities[0] || "");
  };

  const handleRegionChange = (e) => {
    const newRegion = e.target.value;
    const cities = newRegion ? locations[province]?.[newRegion] || [] : [];

    setValue("detailLocation.region", newRegion);
    setValue("detailLocation.city", cities[0] || "");
  };

  const handleCityChange = (e) => {
    setValue("detailLocation.city", e.target.value);
  };

  return (
    <div className="flex flex-col gap-6 xl:flex-row">
      {/* Provincia */}
      <div className="relative font-text xl:w-1/3">
        <select
          className="peer h-10 w-full border-b-2 border-purple-500 text-white bg-transparent focus:outline-none focus:border-white"
          {...register("detailLocation.province", {
            required: "Provincia es requerida",
          })}
          value={province}
          onChange={handleProvinceChange}
        >
          {Object.keys(locations).map((prov) => (
            <option key={prov} value={prov} className="bg-purple-900">
              {prov}
            </option>
          ))}
        </select>
        <label className="absolute left-0 -top-3.5 text-purple-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-purple-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-600 peer-focus:text-sm">
          Provincia
        </label>
      </div>

      {/* Región */}
      <div className="relative font-text xl:w-1/3">
        {errors?.detailLocation?.region && (
          <p className="text-red-500 text-xs mt-1 absolute right-6">
            {errors.detailLocation.region.message}
          </p>
        )}
        <select
          className="peer h-10 w-full border-b-2 border-purple-500 text-white bg-transparent focus:outline-none focus:border-white disabled:opacity-40 disabled:cursor-not-allowed"
          {...register("detailLocation.region", {
            required: "Región es requerida",
          })}
          value={region}
          onChange={handleRegionChange}
          disabled={!province || availableRegions.length === 0}
        >
          <option value="">
            {availableRegions.length ? "Seleccione región" : "No hay regiones"}
          </option>
          {availableRegions.map((reg) => (
            <option key={reg} value={reg} className="bg-purple-900">
              {reg}
            </option>
          ))}
        </select>
        <label className="absolute left-0 -top-3.5 text-purple-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
          Región
        </label>
      </div>

     
      <div className="relative font-text xl:w-1/3">
        {errors?.detailLocation?.city && (
          <p className="text-red-500 text-xs mt-1 absolute right-6">
            {errors.detailLocation.city.message}
          </p>
        )}
        <select
          className="peer h-10 w-full border-b-2 border-purple-500 text-white bg-transparent focus:outline-none focus:border-white disabled:opacity-40 disabled:cursor-not-allowed"
          {...register("detailLocation.city", { required: false })}
          value={city}
          onChange={handleCityChange}
          disabled={!region || availableCities.length === 0}
        >
          <option value="">
            {availableCities.length ? "Seleccione ciudad" : "No hay ciudades"}
          </option>
          {availableCities.map((cit, index) => (
            <option key={`${cit}-${index}`} value={cit} className="bg-purple-900">
              {cit}
            </option>
          ))}
        </select>
        <label className="absolute left-0 -top-3.5 text-purple-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
          Ciudad
        </label>
      </div>
    </div>
  );
};

export default LocationSelector;
