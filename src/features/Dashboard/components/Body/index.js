import React, { Component, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useStyles } from "./styles.js";

import { AddCarModal } from "../AddModal/index";
import { Help } from "../Help/index.js";
import { EditButton } from "../../../../components/EditButton/index.js";
import { DeleteButton } from "../../../../components/DeleteButton/index.js";
import { UpdateCarModal } from "../UpdateModal/index.js";

let cancelBubble = true;
const Body = ({ token }) => {
  const classes = useStyles();
  const [lat, setlat] = useState("");
  const [lng, setlng] = useState("");
  const [cars, setCars] = useState([]);
  const [current, setCurrent] = useState(null);
  const [edit, setEdit] = useState(false);
  let mapContainer = useRef(null);

  const getCars = async (cb) => {
    let res = await fetch(process.env.REACT_APP_API + "api/cars/", {
      mode: "cors",
      cache: "default",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    let response = await res.json();
    cb && cb(response);
    setCars(response);
  };

  const saveCar = async (placas) => {
    const data = new FormData();
    data.append("lat", lat);
    data.append("lon", lng);
    data.append("placas", placas);
    let res = await fetch(process.env.REACT_APP_API + "api/cars/", {
      method: "POST",
      mode: "cors",
      cache: "default",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: data,
    });
    let response = await res.json();
    cancelBubble = true;

    await getCars();
  };

  const deleteCar = async () => {
    const data = new FormData();

    data.append("placas", current);
    let res = await fetch(process.env.REACT_APP_API + "api/cars/", {
      method: "DELETE",
      mode: "cors",
      cache: "default",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: data,
    });
    let response = await res.json();
    cancelBubble = true;
    setCurrent(null);
    await getCars();
  };

  const updateCar = async (newPlates) => {
    const data = new FormData();
    console.log(current);
    data.append("placas", current);
    data.append("newPlacas", newPlates);
    let res = await fetch(process.env.REACT_APP_API + "api/cars/", {
      method: "PATCH",
      mode: "cors",
      cache: "default",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: data,
    });
    let response = await res.json();
    cancelBubble = true;
    setCurrent(null);
    await getCars();
  };

  const size = 200;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenEdit = () => {
    setEdit(true);
  };

  const handleClose = async (e) => {
    if (!!e) {
      await saveCar(e);
    }
    setOpen(false);
  };

  const handleCloseEdit = async (e) => {
    if (!!e) {
      await updateCar(e);
    }
    setEdit(false);
  };

  useEffect(() => {
    var pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),
      // get rendering context for the map canvas when layer is added to the map
      onAdd: function () {
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext("2d");
      },

      render: function () {
        var duration = 1000;
        var t = (performance.now() % duration) / duration;

        var radius = (size / 2) * 0.3;
        var outerRadius = (size / 2) * 0.7 * t + radius;
        var context = this.context;

        // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
          this.width / 2,
          this.height / 2,
          outerRadius,
          0,
          Math.PI * 2
        );
        context.fillStyle = "rgba(255, 200, 200," + (1 - t) + ")";
        context.fill();

        // draw inner circle
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 100, 100, 1)";
        context.strokeStyle = "white";
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // update this image's data with data from the canvas
        this.data = context.getImageData(0, 0, this.width, this.height).data;

        // continuously repaint the map, resulting in the smooth animation of the dot
        map.triggerRepaint();

        // return `true` to let the map know that the image was updated
        return true;
      },
    };

    const map = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 9,
      center: [-99.24064363651739, 37.94168364640112],
    });
    map.on("mousemove", (e) => {
      setlat(e.lngLat.lat);
      setlng(e.lngLat.lng);
    });

    const addCard = (lat, lng, plates) => {
      map.addImage(`car${lat}-${lng}`, pulsingDot, { pixelRatio: 2 });
      map.addSource(`car${lat}-${lng}`, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                plates: `${plates}`,
              },
              geometry: {
                type: "Point",
                coordinates: [lng, lat],
              },
            },
          ],
        },
      });

      map.addLayer({
        id: `car${lat}-${lng}`,
        type: "symbol",
        source: `car${lat}-${lng}`,
        layout: {
          "icon-image": `car${lat}-${lng}`,
        },
      });

      map.on("click", `car${lat}-${lng}`, (e) => {
        cancelBubble = true;
        var coordinates = e.features[0].geometry.coordinates.slice();
        var plates = e.features[0].properties.plates;
        setCurrent(plates);
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup().setLngLat(coordinates).setHTML(plates).addTo(map);
      });
      map.on("mouseenter", `car${lat}-${lng}`, function () {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", `car${lat}-${lng}`, function () {
        map.getCanvas().style.cursor = "";
      });
    };

    map.on("click", function (e) {
      if (cancelBubble) {
        cancelBubble = false;
        return;
      }
      setlat(e.lngLat.lat);
      setlng(e.lngLat.lng);
      handleOpen();
      setCurrent(null);
    });

    map.on("load", () => {
      if (token) {
        getCars((e) => {
          e.map((i) => addCard(i.lat, i.lon, i.placas));
        });
      }
    });
  }, [JSON.stringify(cars), token]);
  return (
    <div>
      <div
        ref={(el) => (mapContainer = el)}
        className={classes.mapContainer}
      ></div>

      <Help />
      {current && <EditButton onClick={() => handleOpenEdit()} />}
      {current && <DeleteButton onClick={deleteCar} />}
      <AddCarModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
      <UpdateCarModal
        open={edit}
        handleClose={handleCloseEdit}
        handleOpen={handleOpenEdit}
      />
    </div>
  );
};

export { Body };
