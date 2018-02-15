<%@page session="false" contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/portlet_2_0" prefix="portlet" %>
<%@ taglib prefix="spring" uri="/WEB-INF/tld/spring.tld" %>
<portlet:defineObjects/>

<portlet:actionURL name="changeSkinVisually" var="urlChangeSkin" escapeXml="false">
    <portlet:param name="action" value="changeSkinVisually"/>
</portlet:actionURL>
<script type="text/javascript">
    var navUriChangeTheme = '${urlChangeSkin}';
</script>

<div class='special-header'>
  <div class='container'>
    <div class='special-header-section'>
      <span class='special-header-section__name'>Шрифт</span>
      <ul class='special-header-section__list special-header-section__list_fonts'>
        <li data-font='low' data-font-active='true' class='special-header-section__item special-header-section__item_small'>
          <span>а</span>
          <div class='ribbon black-ribbon'>
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink"
                 xlink:href="${cr}/sprite/sprite.svg#header--color_ribbon_white">
               </use>
            </svg>
          </div>
        </li>
        <li data-font='middle' data-font-active='false' class='special-header-section__item special-header-section__item_middle'>
          <span>а</span>
          <div class='ribbon black-ribbon'>
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink"
                 xlink:href="${cr}/sprite/sprite.svg#header--color_ribbon_white">
               </use>
            </svg>
          </div>
        </li>
        <li data-font='big' data-font-active='false' class='special-header-section__item special-header-section__item_big'>
          <span>a</span>
          <div class='ribbon black-ribbon'>
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink"
                 xlink:href="${cr}/sprite/sprite.svg#header--color_ribbon_white">
               </use>
            </svg>
          </div>
        </li>
      </ul>
    </div>

    <div class='special-header-section'>
      <span class='special-header-section__name'>Фон</span>
      <ul class='special-header-section__list special-header-section__list_background'>
        <li data-bg='black' data-color-active='true' class='special-header-section__item special-header-section__item_white'>
          <span>ф</span>
          <div class='ribbon black-ribbon'>
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink"
                 xlink:href="${cr}/sprite/sprite.svg#header--color_ribbon_white">
               </use>
            </svg>
          </div>
        </li>
        <li data-bg='white' data-color-active='false' class='special-header-section__item special-header-section__item_black'>
          <span>ф</span>
          <div class='ribbon black-ribbon'>
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink"
                 xlink:href="${cr}/sprite/sprite.svg#header--color_ribbon_black">
               </use>
            </svg>
          </div>
        </li>
        <li data-bg='blue' data-color-active='false' class='special-header-section__item special-header-section__item_blue'>
          <span>ф</span>
          <div class='ribbon black-ribbon'>
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink"
                 xlink:href="${cr}/sprite/sprite.svg#header--color_ribbon_blue">
               </use>
            </svg>
          </div>
        </li>
      </ul>
    </div>

    <div class='special-header-section'>
      <span class='special-header-section__name'>Изображение</span>
      <ul class='special-header-section__list special-header-section__list_img'>
        <li data-img="show" data-img-active='true' class='special-header-section__item'>
          <span>Вкл</span>
          <b class='spec-switcher'>
            <b class='spec-switcher__lines'></b>
          </b>
        </li>

        <li data-img="hide" data-img-active='false' class='special-header-section__item'>
          <span>Выкл</span>
          <b class='spec-switcher'>
            <b class='spec-switcher__lines'></b>
          </b>
        </li>
      </ul>
    </div>

    <div class='special-header-section'>
        <div class="dropdown dropdown_spec">
            <div class="dropdown__button button">
              <span class="locale">Настройки</span>
            </div>
            <div class="dropdown__menu">
                <ul class="dropdown__list">
                  <li class="dropdown__item dropdown_font-family">
                    <span class='dropdown__item-name'>Шрифт</span>
                    <label data-font='ptsans'>
                      <input name='font' class='dropdown__checkbox' type='radio'>
                      <b class='dropdown__checkobox-fake'></b>
                      <span class='dropdown__checkbox-name'>PT Sans</span>
                    </label>
                    <label data-font='trebuchet'>
                      <input name='font' class='dropdown__checkbox' type='radio'>
                      <b class='dropdown__checkobox-fake'></b>
                      <span class='dropdown__checkbox-name'>Rubik</span>
                    </label>
                  </li>

                  <li class="dropdown__item dropdown__item_letter-spacing">
                    <span class='dropdown__item-name'>Межбуквенный интервал</span>
                    <label data-spacing='lsZero'>
                      <input name='spacing' class='dropdown__checkbox' type='radio'>
                      <b class='dropdown__checkobox-fake'></b>
                      <span class='dropdown__checkbox-name'>Стандартный (0 пт)</span>
                    </label>
                    <label data-spacing='lsMiddle'>
                      <input name='spacing' class='dropdown__checkbox' type='radio'>
                      <b class='dropdown__checkobox-fake'></b>
                      <span class='dropdown__checkbox-name'>Средний (0,5 пт)</span>
                    </label>
                    <label data-spacing='lsBig'>
                      <input name='spacing' class='dropdown__checkbox' type='radio'>
                      <b class='dropdown__checkobox-fake'></b>
                      <span class='dropdown__checkbox-name'>Большой (1 пт)</span>
                    </label>
                  </li>
                </ul>
            </div>
        </div>
    </div>

    <div class='special-header-section'>
      <a href="${urlChangeSkin}&theme=gost" class='special-header-section__name special-header-section__name_standart'>Обычная версия</a>
    </div>
  </div>
</div>
