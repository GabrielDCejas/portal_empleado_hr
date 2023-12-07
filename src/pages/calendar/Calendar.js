// ** React Import
import { useEffect, useRef } from "react";

// ** Full Calendar & it's Plugins
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import interactionPlugin from "@fullcalendar/interaction";

// ** Third Party Style Import
import "bootstrap-icons/font/bootstrap-icons.css";

import esLocale from "@fullcalendar/core/locales/es";

const blankEvent = {
  title: "",
  start: "",
  end: "",
  allDay: false,
  url: "",
  extendedProps: {
    calendar: "",
    guests: [],
    location: "",
    description: "",
  },
};

const Calendar = (props) => {
  // ** Props
  const {
    selectedEventTypes,
    events,
    dispatch,
    direction,
    updateEvent,
    calendarApi,
    calendarsColor,
    setCalendarApi,
    handleLeftSidebarToggle,
    onEventClick,
  } = props;

  // ** Refs
  const calendarRef = useRef();

  useEffect(() => {
    if (calendarApi === null) {
      // @ts-ignore
      setCalendarApi(calendarRef.current?.getApi());
    }
  }, [calendarApi, setCalendarApi]);

  const filteredEvents =
    selectedEventTypes.size === 0
      ? [] // No muestra eventos si no se selecciona ningún tipo
      : events.filter((event) => selectedEventTypes.has(event?.extendedProps?.calendar));

  const handleEventClick = (clickedEvent) => {
    props.onEventClick(clickedEvent);
  };
  // ** calendarOptions(Props)
  const calendarOptions = {
    events: filteredEvents,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
    initialView: "dayGridMonth",
    locales: [esLocale], // Establece el idioma en español
    locale: "es", // Configura el idioma por defecto
    headerToolbar: {
      start: "sidebarToggle, prev, next, title",
      end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },
    views: {
      week: {
        titleFormat: { year: "numeric", month: "long", day: "numeric" },
      },
    },
    /*
          Enable dragging and resizing event
          ? Docs: https://fullcalendar.io/docs/editable
        */
    editable: true,

    /*
          Enable resizing event from start
          ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
        */
    eventResizableFromStart: true,

    /*
            Automatically scroll the scroll-containers during event drag-and-drop and date selecting
            ? Docs: https://fullcalendar.io/docs/dragScroll
          */
    dragScroll: true,

    /*
            Max number of events within a given day
            ? Docs: https://fullcalendar.io/docs/dayMaxEvents
          */
    dayMaxEvents: 2,

    /*
            Determines if day names and week names are clickable
            ? Docs: https://fullcalendar.io/docs/navLinks
          */
    navLinks: true,
    eventClassNames({ event: calendarEvent }) {
      const eventType = calendarEvent._def.extendedProps.tipoLicencia;
      console.log("eventType", eventType);

      let colorClass;

      // Verifica el tipo de licencia y asigna una clase de color correspondiente
      switch (eventType) {
        case "Vacaciones":
          colorClass = "bg-custom-green";
          break;
        case "Licencia Medica":
          colorClass = "bg-custom-red";
          break;
        case "Ausentismo":
          colorClass = "bg-custom-yellow";
          break;
        case "Trámite Personal":
          colorClass = "bg-custom-custom";
          break;
        case "Licencia Medica":
          colorClass = "bg-custom-orange";
          break;
        case "Enfermedad familiar":
          colorClass = "bg-custom-azul";
          break;
        case "Trámite Bancario":
          colorClass = "bg-custom-purple";
          break;
        case "Dia de Cumpleaños":
          colorClass = "bg-custom-blue";
          break;
        default:
          colorClass = "bg-custom-turquoise"; // Clase de color predeterminada para otros tipos de eventos
      }
      return [
        // Clase de color de fondo
        colorClass,
        // Clase de color de texto
        "text-white",
      ];
    },

    eventClick({ event: clickedEvent }) {
      handleEventClick(clickedEvent);
    },
    customButtons: {
      sidebarToggle: {
        icon: "bi bi-list",
        click() {
          handleLeftSidebarToggle();
        },
      },
    },
    dateClick(info) {
      const ev = { ...blankEvent };
      ev.start = info.date;
      ev.end = info.date;
      ev.allDay = true;

      // @ts-ignore
    },

    /*
            Handle event drop (Also include dragged event)
            ? Docs: https://fullcalendar.io/docs/eventDrop
            ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
          */
    eventDrop({ event: droppedEvent }) {
      dispatch(updateEvent(droppedEvent));
    },

    /*
            Handle event resize
            ? Docs: https://fullcalendar.io/docs/eventResize
          */
    eventResize({ event: resizedEvent }) {
      dispatch(updateEvent(resizedEvent));
    },
    ref: calendarRef,

    // Get direction from app state (store)
    direction,
  };

  // @ts-ignore
  return <FullCalendar {...calendarOptions} />;
};

export default Calendar;
