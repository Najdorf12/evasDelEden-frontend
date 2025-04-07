import { useEffect } from "react";
import { locations } from "../api/locations";

const LocationSelector = ({ register, setValue, watch }) => {
  const formValues = watch();
  const detailLocation = formValues.detailLocation || {
    province: "Mendoza",
    region: "",
    city: ""
  };

  const { province, region } = detailLocation;
  
  const availableRegions = province ? Object.keys(locations[province] || {}) : [];
  const availableCities = (province && region) ? locations[province]?.[region] || [] : [];

  useEffect(() => {
    if (!province) {
      setValue("detailLocation.province", "Mendoza");
    }
  }, [province, setValue]);

  useEffect(() => {
    if (province && availableRegions.length > 0) {
      if (!availableRegions.includes(detailLocation.region)) {
        setValue("detailLocation.region", availableRegions[0]);
      }
    } else {
      setValue("detailLocation.region", "");
    }
    setValue("detailLocation.city", "");
  }, [province, availableRegions, setValue]);

  useEffect(() => {
    if (region && availableCities.length > 0) {
      if (!availableCities.includes(detailLocation.city)) {
        setValue("detailLocation.city", availableCities[0]);
      }
    } else {
      setValue("detailLocation.city", "");
    }
  }, [region, availableCities, setValue]);

  return (
    <div className="flex flex-col gap-6 xl:flex-row">
      <div className="relative font-text xl:w-1/3">
        <select
          className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent focus:outline-none focus:border-white"
          {...register("detailLocation.province", {
            required: "Provincia es requerida"
          })}
        >
          {Object.keys(locations).map((prov) => (
            <option key={prov} value={prov} className="bg-zinc-800">
              {prov}
            </option>
          ))}
        </select>
        <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
          Provincia
        </label>
      </div>

      <div className="relative font-text xl:w-1/3">
        <select
          className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent focus:outline-none focus:border-white"
          {...register("detailLocation.region", {
            required: "Región es requerida"
          })}
          disabled={!province || availableRegions.length === 0}
        >
          <option value="">{availableRegions.length ? "Seleccione región" : "No hay regiones"}</option>
          {availableRegions.map((reg) => (
            <option key={reg} value={reg} className="bg-zinc-800">
              {reg}
            </option>
          ))}
        </select>
        <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
          Región
        </label>
      </div>

      <div className="relative font-text xl:w-1/3">
        <select
          className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent focus:outline-none focus:border-white"
          {...register("detailLocation.city", {
            required: "Ciudad es requerida"
          })}
          disabled={!region || availableCities.length === 0}
        >
          <option value="">{availableCities.length ? "Seleccione ciudad" : "No hay ciudades"}</option>
          {availableCities.map((cit, index) => (
            <option key={`${cit}-${index}`} value={cit} className="bg-zinc-800">
              {cit}
            </option>
          ))}
        </select>
        <label className="absolute left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
          Ciudad
        </label>
      </div>
    </div>
  );
};

export default LocationSelector;