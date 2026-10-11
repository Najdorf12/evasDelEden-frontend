import { useMemo } from "react";
import { locations } from "../api/locations";
import CustomSelect from "./CustomSelect";

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
        <CustomSelect
          id="location-province"
          label="Provincia"
          value={province}
          onChange={(newProvince) => {
            const regions = Object.keys(locations[newProvince] || {});
            const newRegion = regions[0] || "";
            const cities = newRegion
              ? locations[newProvince]?.[newRegion] || []
              : [];

            setValue("detailLocation.province", newProvince, {
              shouldValidate: true,
              shouldDirty: true,
            });

            setValue("detailLocation.region", newRegion, {
              shouldValidate: true,
              shouldDirty: true,
            });

            setValue("detailLocation.city", cities[0] || "", {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          options={Object.keys(locations)}
          placeholder="Seleccioná una provincia"
        />
      {/*   <label className="absolute left-0 -top-3.5 text-purple-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-purple-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-600 peer-focus:text-sm">
          Provincia
        </label> */}
      </div>

      {/* Región */}
 <div className="relative font-text xl:w-1/3">
        {errors?.detailLocation?.region && (
          <p className="text-red-500 text-xs mt-1 absolute right-6">
            {errors.detailLocation.region.message}
          </p>
        )}
        <CustomSelect
          id="location-region"
          label="Zona"
          value={region}
          onChange={(newRegion) => {
            const cities = newRegion
              ? locations[province]?.[newRegion] || []
              : [];

            setValue("detailLocation.region", newRegion, {
              shouldValidate: true,
              shouldDirty: true,
            });

            setValue("detailLocation.city", cities[0] || "", {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          options={availableRegions}
          placeholder="Seleccioná una zona"
          disabled={!province}
        />
       {/*  <label className="absolute left-0 -top-3.5 text-purple-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
          Región
        </label> */}
      </div>

      <div className="relative font-text xl:w-1/3">
        {errors?.detailLocation?.city && (
          <p className="text-red-500 text-xs mt-1 absolute right-6">
            {errors.detailLocation.city.message}
          </p>
        )}
        <CustomSelect
          id="location-city"
          label="Localidad"
          value={city}
          onChange={(newCity) => {
            setValue("detailLocation.city", newCity, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          options={availableCities}
          placeholder="Seleccioná una localidad"
          disabled={!region}
        />
       {/*  <label className="absolute left-0 -top-3.5 text-purple-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white peer-focus:text-sm">
          Ciudad
        </label> */}
      </div>
    </div>
  );
};

export default LocationSelector;
