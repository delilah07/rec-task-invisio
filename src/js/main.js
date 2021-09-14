import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";

import "../index.html";

import "jquery";
import "popper.js";

import "bootstrap";

import { cars } from "./cars.js";

jQuery(document).ready(function ($) {
  const tableCars = $(".main-table");
  const tbodyTableCars = tableCars.find("tbody");
  let trTableCars = "";

  // add 4 cars in the table

  $.each(cars.slice(0, 4), function (index, value) {
    trTableCars +=
      "<tr> <td>" +
      value["id"] +
      "</td><td>" +
      value["maker"] +
      "</td><td>" +
      value["model"] +
      "</td><td>" +
      value["year"] +
      "</td><td><button type='button' class='btn btn-delete btn-danger'>Usuń</button></td></tr>";
  });

  tbodyTableCars.html(trTableCars);

  // cars img
  $(".main-table tbody tr:first-child").addClass("table-light");
  let idCars;
  let imgCars = "";
  function changeImg() {
    idCars = $("tbody tr.table-light").find("td:first-child").html();
    if ($("tbody tr").hasClass("table-light")) {
      for (let i = 0; i < cars.length; i++) {
        if (cars[i].id === idCars) {
          imgCars = cars[i].img;
        }
      }
    }
    return imgCars;
  }
  $(".img-fluid").attr("src", changeImg());

  $(".main-table tbody tr").on("click", function () {
    $("tbody tr").removeClass("table-light");
    $(this).addClass("table-light");
    $(".img-fluid").attr("src", changeImg());
  });

  // modal table
  $(".btn-add").on("click", function () {
    const modTableCars = $(".modal-table");
    const modTbodyTableCars = modTableCars.find("tbody");
    let modTrTableCars = "";
    let mainTableID = $(".main-table tr td:first-child").text().split("");

    $.each(cars, function (index, value) {
      if (mainTableID.indexOf(value["id"]) == -1) {
        modTrTableCars +=
          "<tr data-bs-dismiss='modal' aria-label='Close'> <td>" +
          value["id"] +
          "</td><td>" +
          value["maker"] +
          "</td><td>" +
          value["model"] +
          "</td><td>" +
          value["year"] +
          "</td><td><img src='" +
          value["img"] +
          "'></td></tr>";
      }
    });

    modTbodyTableCars.html(modTrTableCars);
  });

  // add car from modal window
  $(".modal-table").on("click", "tr", function (event) {
    let idCars = $(this).find("td:first-child").html();

    $.each(cars, function (index, value) {
      if (idCars === value["id"]) {
        trTableCars =
          "<tr> <td>" +
          value["id"] +
          "</td><td>" +
          value["maker"] +
          "</td><td>" +
          value["model"] +
          "</td><td>" +
          value["year"] +
          "</td><td><button type='button' class='btn btn-delete btn-danger'>Usuń</button></td></tr>";
      }
    });
    tbodyTableCars.append(trTableCars);
  });

  // add row
  $(".btn-add-new").on("click", function () {
    tbodyTableCars.append(
      `<tr>
        <td></td>
        <td><input type="text"></td>
        <td><input type="text"></td>
        <td><input type="text"></td>
        <td>
          <input class="input__file" type="file" id="formFile">
          <label for="formFile" class="btn btn-success">Zdjęcie...</label>
        </td>
      </tr>`
    );
  });

  // sorted table by model
  $("#sortModelBtn").on("click", function () {
    document.getElementById("year_order").value = "asc";
    tbodyTableCars
      .find("tr")
      .sort(function (a, b) {
        if ($("#model_order").val() == "asc") {
          return $("td:nth-child(2)", a)
            .text()
            .localeCompare($("td:nth-child(2)", b).text());
        } else {
          return $("td:nth-child(2)", b)
            .text()
            .localeCompare($("td:nth-child(2)", a).text());
        }
      })
      .appendTo(tbodyTableCars);

    let sortOrder = $("#model_order").val();
    if (sortOrder == "asc") {
      document.getElementById("model_order").value = "desc";
    }
    if (sortOrder == "desc") {
      document.getElementById("model_order").value = "asc";
    }
  });

  // sorted table by year
  $("#sortYearBtn").on("click", function () {
    document.getElementById("model_order").value = "asc";
    tbodyTableCars
      .find("tr")
      .sort(function (a, b) {
        if ($("#year_order").val() == "asc") {
          return $("td:nth-child(3)", a)
            .text()
            .localeCompare($("td:nth-child(3)", b).text());
        } else {
          return $("td:nth-child(3)", b)
            .text()
            .localeCompare($("td:nth-child(3)", a).text());
        }
      })
      .appendTo(tbodyTableCars);

    let sortOrder = $("#year_order").val();
    if (sortOrder == "asc") {
      document.getElementById("year_order").value = "desc";
    }
    if (sortOrder == "desc") {
      document.getElementById("year_order").value = "asc";
    }
  });

  // table filtration by maker
  $("#filterMakerBtn span").on("click", function () {
    $(this).toggle();
    $(this).siblings().toggle();
  });

  $(document).mouseup(function (e) {
    const div = $("#filterMakerBtn");
    if (
      !div.is(e.target) &&
      div.has(e.target).length === 0 &&
      $("#filterMakerBtn input").val().length < 1
    ) {
      div.find("span").show();
      div.find("input").hide();
    }
  });

  $("#filterMakerBtn input").on("keyup", function () {
    let value = String($(this).val()).toLowerCase();
    $(".table tbody tr").filter(function () {
      $(this).toggle(
        $(this).find("td:nth-child(2)").text().toLowerCase().indexOf(value) > -1
      );
    });
    $("tbody tr").removeClass("table-light");
    $("tbody tr:visible:first").addClass("table-light");
    $(".img-fluid").attr("src", changeImg());
  });

  // delete row
  $(".main-table").on("click", ".btn-delete", function (event) {
    $(this).parents("tr").remove();
    $("tbody tr:first-child").addClass("table-light");
    $(".img-fluid").attr("src", changeImg());
  });
});
