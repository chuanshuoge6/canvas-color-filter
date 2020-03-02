import React, { useState, useEffect } from 'react';
import { Slider, Button } from 'antd'
import { Container, Row, Col } from 'react-grid-system'
import saveAs from 'file-saver';
import sampleImg from './sample.jpg'

function App() {
  const [imgW, setimgW] = useState(null)
  const [imgH, setimgH] = useState(null)
  const [canvasblur, setcanvasblur] = useState(null)
  const [canvasbrightness, setcanvasbrightness] = useState(null)
  const [canvascontrast, setcanvascontrast] = useState(null)
  const [canvasgrey, setcanvasgrey] = useState(null)
  const [canvashue, setcanvashue] = useState(null)
  const [canvasinvert, setcanvasinvert] = useState(null)
  const [canvasopacity, setcanvasopacity] = useState(null)
  const [canvassaturate, setcanvassaturate] = useState(null)
  const [canvassepia, setcanvassepia] = useState(null)
  const [canvascombined, setcanvascombined] = useState(null)
  const [dataBlur, setdataBlur] = useState(null)
  const [dataBrightness, setdataBrightness] = useState(null)
  const [dataContrast, setdataContrast] = useState(null)
  const [dataGrey, setdataGrey] = useState(null)
  const [dataHue, setdataHue] = useState(null)
  const [dataInverted, setdataInverted] = useState(null)
  const [dataOpacity, setdataOpacity] = useState(null)
  const [dataSaturate, setdataSaturate] = useState(null)
  const [dataSepia, setdataSepia] = useState(null)
  const [dataCombined, setdataCombined] = useState(null)
  const [originalImage, setoriginalImage] = useState(null)
  const [uploadImg, setuploadImg] = useState(null)
  const [combineFilters, setcombineFilters] = useState({
    blur: 0,
    brightness: 100,
    contrast: 100,
    gray: 0,
    hue: 0,
    invert: 0,
    opacity: 100,
    saturate: 100,
    sepia: 0,
  })

  useEffect(() => {
    setcanvasblur(document.getElementById('canvasBlur').getContext('2d'))
    setcanvasbrightness(document.getElementById('canvasBrightness').getContext('2d'))
    setcanvascontrast(document.getElementById('canvasContrast').getContext('2d'))
    setcanvasgrey(document.getElementById('canvasGrey').getContext('2d'))
    setcanvashue(document.getElementById('canvasHue').getContext('2d'))
    setcanvasinvert(document.getElementById('canvasInvert').getContext('2d'))
    setcanvasopacity(document.getElementById('canvasOpacity').getContext('2d'))
    setcanvassaturate(document.getElementById('canvasSaturate').getContext('2d'))
    setcanvassepia(document.getElementById('canvasSepia').getContext('2d'))
    setcanvascombined(document.getElementById('canvasCombined').getContext('2d'))
    setoriginalImage(document.getElementById('imageId'))

    document.title = 'canvas color filter'
  }, [])

  const imageLoaded = () => {
    setimgH(originalImage.height)
    setimgW(originalImage.width)

    setTimeout(() => {
      drawBlur(2)
      drawBrightness(150)
      drawContrast(150)
      drawGrey(100)
      drawHue(180)
      drawInvert(100)
      drawOpacity(50)
      drawSaturate(150)
      drawSepia(60)
      drawFilters(combineFilters)
    }, 1000);
  }

  const drawBlur = (value) => {
    canvasblur.filter = 'blur(' + value + 'px)'
    canvasblur.drawImage(originalImage, 0, 0)
    setdataBlur(canvasblur.canvas.toDataURL())
  }

  const drawBrightness = (value) => {
    canvasbrightness.filter = 'brightness(' + value + '%)'
    canvasbrightness.drawImage(originalImage, 0, 0)
    setdataBrightness(canvasbrightness.canvas.toDataURL())
  }

  const drawContrast = (value) => {
    canvascontrast.filter = 'contrast(' + value + '%)'
    canvascontrast.drawImage(originalImage, 0, 0)
    setdataContrast(canvascontrast.canvas.toDataURL())
  }

  const drawGrey = (value) => {
    canvasgrey.filter = 'grayscale(' + value + '%)'
    canvasgrey.drawImage(originalImage, 0, 0)
    setdataGrey(canvasgrey.canvas.toDataURL())
  }

  const drawHue = (value) => {
    canvashue.filter = 'hue-rotate(' + value + 'deg)'
    canvashue.drawImage(originalImage, 0, 0)
    setdataHue(canvashue.canvas.toDataURL())
  }

  const drawInvert = (value) => {
    canvasinvert.filter = 'invert(' + value + '%)'
    canvasinvert.drawImage(originalImage, 0, 0)
    setdataInverted(canvasinvert.canvas.toDataURL())
  }

  const drawOpacity = (value) => {
    canvasopacity.clearRect(0, 0, imgW, imgH)
    canvasopacity.filter = 'opacity(' + value + '%)'
    canvasopacity.drawImage(originalImage, 0, 0)
    setdataOpacity(canvasopacity.canvas.toDataURL())
  }

  const drawSaturate = (value) => {
    canvassaturate.filter = 'saturate(' + value + '%)'
    canvassaturate.drawImage(originalImage, 0, 0)
    setdataSaturate(canvassaturate.canvas.toDataURL())
  }

  const drawSepia = (value) => {
    canvassepia.filter = 'sepia(' + value + '%)'
    canvassepia.drawImage(originalImage, 0, 0)
    setdataSepia(canvassepia.canvas.toDataURL())
  }

  const drawFilters = (value) => {
    canvascombined.clearRect(0, 0, imgW, imgH)

    canvascombined.filter = 'blur(' + value.blur + 'px)'
      + ' contrast(' + value.contrast + '%) '
      + ' brightness(' + value.brightness + '%) '
      + ' grayscale(' + value.gray + '%) '
      + ' hue-rotate(' + value.hue + 'deg) '
      + ' invert(' + value.invert + '%) '
      + ' opacity(' + value.opacity + '%) '
      + ' saturate(' + value.saturate + '%) '
      + ' sepia(' + value.sepia + '%) '

    canvascombined.drawImage(originalImage, 0, 0)
    setdataCombined(canvascombined.canvas.toDataURL())
  }

  const updateFilters = (value, name) => {
    let newFilters = combineFilters
    newFilters[name] = value
    setcombineFilters(newFilters)

    drawFilters(newFilters)
  }

  const filterFrame = {
    width: '305px', marginBottom: '10px', borderStyle: 'dotted',
    borderWidth: '2px', borderColor: 'red'
  }

  const browseImg = (e) => {
    const fileURL = URL.createObjectURL(e.target.files[0])
    //get url where uploaded image is temporarily stored
    //blob:http://localhost:3000/11c28a94-d9df-43e1-ab6c-2185e1449eb6
    setuploadImg(fileURL)
  }

  return (
    <div>
      <div style={{ display: 'none' }}>
        <canvas id='canvasBlur' width={imgW ? imgW : 500} height={imgH ? imgH : 500} />
      </div>
      <div style={{ display: 'none' }}>
        <canvas id='canvasBrightness' width={imgW ? imgW : 500} height={imgH ? imgH : 500} />
      </div>
      <div style={{ display: 'none' }}>
        <canvas id='canvasContrast' width={imgW ? imgW : 500} height={imgH ? imgH : 500} />
      </div>
      <div style={{ display: 'none' }}>
        <canvas id='canvasGrey' width={imgW ? imgW : 500} height={imgH ? imgH : 500} />
      </div>
      <div style={{ display: 'none' }}>
        <canvas id='canvasHue' width={imgW ? imgW : 500} height={imgH ? imgH : 500} />
      </div>
      <div style={{ display: 'none' }}>
        <canvas id='canvasInvert' width={imgW ? imgW : 500} height={imgH ? imgH : 500} />
      </div>
      <div style={{ display: 'none' }}>
        <canvas id='canvasOpacity' width={imgW ? imgW : 500} height={imgH ? imgH : 500} />
      </div>
      <div style={{ display: 'none' }}>
        <canvas id='canvasSaturate' width={imgW ? imgW : 500} height={imgH ? imgH : 500} />
      </div>
      <div style={{ display: 'none' }}>
        <canvas id='canvasSepia' width={imgW ? imgW : 500} height={imgH ? imgH : 500} />
      </div>
      <div style={{ display: 'none' }}>
        <canvas id='canvasCombined' width={imgW ? imgW : 500} height={imgH ? imgH : 500} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'none' }}>
            <img src={uploadImg ? uploadImg : sampleImg} id='imageId'
              onLoad={() => imageLoaded()} />
          </div>

          <img src={uploadImg ? uploadImg : sampleImg}
            style={{ width: '600px', objectFit: 'contain' }} /><br />

          <input type='file' onChange={(e) => browseImg(e)}
            style={{ backgroundColor: 'gold' }} />
          Large image may take long to render and download
        </div>
      </div>

      <Container>
        <Row>
          <Col>
            {/* blur */}
            <div style={filterFrame}>

              <Container>
                <Row>
                  <Col sm={3}><b>Blur:</b></Col>
                  <Col sm={9}>
                    <Slider tooltipVisible max={10} defaultValue={2}
                      style={{ width: '200px' }} onChange={e => { drawBlur(e) }} />
                  </Col>
                </Row>
              </Container>

              {dataBlur ?
                <img src={dataBlur}
                  style={{ width: '300px', objectFit: 'contain' }} />
                : null
              }

              <Button size='small' type="primary"
                onClick={() => saveAs(dataBlur, 'blur.png')}>Save</Button>
            </div>
          </Col>

          <Col>
            {/* brightness */}
            <div style={filterFrame}>

              <Container>
                <Row>
                  <Col sm={3}><b>Brightness:</b></Col>
                  <Col sm={9}>
                    <Slider tooltipVisible max={500} defaultValue={150} step={10}
                      style={{ width: '200px' }} onChange={e => { drawBrightness(e) }} />
                  </Col>
                </Row>
              </Container>

              {dataBrightness ?
                <img src={dataBrightness}
                  style={{ width: '300px', objectFit: 'contain' }} />
                : null
              }

              <Button size='small' type="primary"
                onClick={() => saveAs(dataBrightness, 'brightness.png')}>Save</Button>
            </div>
          </Col>

          <Col>
            {/* contrast */}
            <div style={filterFrame}>

              <Container>
                <Row>
                  <Col sm={3}><b>Contrast:</b></Col>
                  <Col sm={9}>
                    <Slider tooltipVisible max={500} defaultValue={150} step={10}
                      style={{ width: '200px' }} onChange={e => { drawContrast(e) }} />
                  </Col>
                </Row>
              </Container>

              {dataContrast ?
                <img src={dataContrast}
                  style={{ width: '300px', objectFit: 'contain' }} />
                : null
              }

              <Button size='small' type="primary"
                onClick={() => saveAs(dataContrast, 'contrast.png')}>Save</Button>
            </div>
          </Col>

          <Col>
            {/* greyscale */}
            <div style={filterFrame}>

              <Container>
                <Row>
                  <Col sm={3}><b>GreyScale:</b></Col>
                  <Col sm={9}>
                    <Slider tooltipVisible max={100} defaultValue={100} step={1}
                      style={{ width: '200px' }} onChange={e => { drawGrey(e) }} />
                  </Col>
                </Row>
              </Container>

              {dataGrey ?
                <img src={dataGrey}
                  style={{ width: '300px', objectFit: 'contain' }} />
                : null
              }

              <Button size='small' type="primary"
                onClick={() => saveAs(dataGrey, 'greyscale.png')}>Save</Button>
            </div>
          </Col>

          <Col>
            {/* hue rotate */}
            <div style={filterFrame}>

              <Container>
                <Row>
                  <Col sm={3}><b>HueRotate:</b></Col>
                  <Col sm={9}>
                    <Slider tooltipVisible max={180} defaultValue={180} step={1}
                      style={{ width: '200px' }} onChange={e => { drawHue(e) }} />
                  </Col>
                </Row>
              </Container>

              {dataHue ?
                <img src={dataHue}
                  style={{ width: '300px', objectFit: 'contain' }} />
                : null
              }

              <Button size='small' type="primary"
                onClick={() => saveAs(dataHue, 'hueRotate.png')}>Save</Button>
            </div>
          </Col>

          <Col>
            {/* invert */}
            <div style={filterFrame}>

              <Container>
                <Row>
                  <Col sm={3}><b>Invert:</b></Col>
                  <Col sm={9}>
                    <Slider tooltipVisible max={100} defaultValue={100} step={1}
                      style={{ width: '200px' }} onChange={e => { drawInvert(e) }} />
                  </Col>
                </Row>
              </Container>

              {dataInverted ?
                <img src={dataInverted}
                  style={{ width: '300px', objectFit: 'contain' }} />
                : null
              }

              <Button size='small' type="primary"
                onClick={() => saveAs(dataInverted, 'invert.png')}>Save</Button>
            </div>
          </Col>

          <Col>
            {/* opacity */}
            <div style={filterFrame}>

              <Container>
                <Row>
                  <Col sm={3}><b>Opacity:</b></Col>
                  <Col sm={9}>
                    <Slider tooltipVisible max={100} defaultValue={50} step={1}
                      style={{ width: '200px' }} onChange={e => { drawOpacity(e) }} />
                  </Col>
                </Row>
              </Container>

              {dataOpacity ?
                <img src={dataOpacity}
                  style={{ width: '300px', objectFit: 'contain' }} />
                : null
              }

              <Button size='small' type="primary"
                onClick={() => saveAs(dataOpacity, 'opacity.png')}>Save</Button>
            </div>
          </Col>

          <Col>
            {/* saturate */}
            <div style={filterFrame}>

              <Container>
                <Row>
                  <Col sm={3}><b>Saturate:</b></Col>
                  <Col sm={9}>
                    <Slider tooltipVisible max={500} defaultValue={150} step={10}
                      style={{ width: '200px' }} onChange={e => { drawSaturate(e) }} />
                  </Col>
                </Row>
              </Container>

              {dataSaturate ?
                <img src={dataSaturate}
                  style={{ width: '300px', objectFit: 'contain' }} />
                : null
              }

              <Button size='small' type="primary"
                onClick={() => saveAs(dataSaturate, 'saturate.png')}>Save</Button>
            </div>
          </Col>

          <Col>
            {/* sepia */}
            <div style={filterFrame}>

              <Container>
                <Row>
                  <Col sm={3}><b>Sepia:</b></Col>
                  <Col sm={9}>
                    <Slider tooltipVisible max={100} defaultValue={60} step={1}
                      style={{ width: '200px' }} onChange={e => { drawSepia(e) }} />
                  </Col>
                </Row>
              </Container>

              {dataSepia ?
                <img src={dataSepia}
                  style={{ width: '300px', objectFit: 'contain' }} />
                : null
              }

              <Button size='small' type="primary"
                onClick={() => saveAs(dataSepia, 'sepia.png')}>Save</Button>
            </div>
          </Col>
        </Row>
      </Container>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {/* combined filters */}
        <div style={filterFrame}>

          <Container>
            <Row>
              <Col sm={3}><b>Blur:</b></Col>
              <Col sm={9}>
                <Slider max={10} defaultValue={0}
                  style={{ width: '200px' }} onChange={e => updateFilters(e, 'blur')} />
              </Col>
            </Row>
            <Row>
              <Col sm={3}><b>Brightness:</b></Col>
              <Col sm={9}>
                <Slider max={500} defaultValue={100} step={10}
                  style={{ width: '200px' }} onChange={e => updateFilters(e, 'brightness')} />
              </Col>
            </Row>
            <Row>
              <Col sm={3}><b>Contrast:</b></Col>
              <Col sm={9}>
                <Slider max={500} defaultValue={100} step={10}
                  style={{ width: '200px' }} onChange={e => updateFilters(e, 'contrast')} />
              </Col>
            </Row>
            <Row>
              <Col sm={3}><b>GreyScale:</b></Col>
              <Col sm={9}>
                <Slider max={100} defaultValue={0} step={1}
                  style={{ width: '200px' }} onChange={e => updateFilters(e, 'gray')} />
              </Col>
            </Row>
            <Row>
              <Col sm={3}><b>HueRotate:</b></Col>
              <Col sm={9}>
                <Slider max={180} defaultValue={0} step={1}
                  style={{ width: '200px' }} onChange={e => updateFilters(e, 'hue')} />
              </Col>
            </Row>
            <Row>
              <Col sm={3}><b>Invert:</b></Col>
              <Col sm={9}>
                <Slider max={100} defaultValue={0} step={1}
                  style={{ width: '200px' }} onChange={e => updateFilters(e, 'invert')} />
              </Col>
            </Row>
            <Row>
              <Col sm={3}><b>Opacity:</b></Col>
              <Col sm={9}>
                <Slider max={100} defaultValue={100} step={1}
                  style={{ width: '200px' }} onChange={e => updateFilters(e, 'opacity')} />
              </Col>
            </Row>
            <Row>
              <Col sm={3}><b>Saturate:</b></Col>
              <Col sm={9}>
                <Slider max={500} defaultValue={100} step={10}
                  style={{ width: '200px' }} onChange={e => updateFilters(e, 'saturate')} />
              </Col>
            </Row>
            <Row>
              <Col sm={3}><b>Sepia:</b></Col>
              <Col sm={9}>
                <Slider max={100} defaultValue={0} step={1}
                  style={{ width: '200px' }} onChange={e => updateFilters(e, 'sepia')} />
              </Col>
            </Row>
          </Container>

          {dataCombined ?
            <img src={dataCombined}
              style={{ width: '300px', objectFit: 'contain' }} />
            : null
          }

          <Button size='small' type="primary"
            onClick={() => saveAs(dataCombined, 'filters.png')}>Save</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
