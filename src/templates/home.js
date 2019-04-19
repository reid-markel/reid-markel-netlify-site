import React from "react"
import * as PropTypes from "prop-types"
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import Layout from "../components/Layout"
import Content, { HTMLContent } from "../components/Content"
import IconMenu from '../components/IconMenu'
import iconLinks from '../data/artworksMenu'
import select from '../components/utils'
import PreviewImage from '../components/PreviewCompatibleImage'

const HomePageTemplate = ({ image, heading, mainpitch, main, title, content, contentComponent, firstLink, secondLink, thirdLink, fourthLink }) => {
  const PageContent = contentComponent || Content

  return (
    <div>
      <div
    className="full-width-image margin-top-0"
    style={{
      backgroundImage: `url(${
        !!image.childImageSharp ? image.childImageSharp.fluid.src : image
      })`,
      backgroundPosition: `top left`,
      backgroundAttachment: `fixed`,
    }}
  >
    <div
      style={{
        display: 'flex',
        height: '150px',
        lineHeight: '1',
        justifyContent: 'space-around',
        alignItems: 'left',
        flexDirection: 'column',
      }}
    >
      <h1
        className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen is-centered animated bounceInLeft"
        style={{
          boxShadow:
            'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
          backgroundColor: 'rgb(255, 68, 0)',
          color: 'white',
          lineHeight: '1',
          padding: '0.25em',
        }}
      >
        {title}
      </h1>
        <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen animated bounceInRight"
          style={{
            boxShadow:
              'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
            backgroundColor: 'rgb(255, 68, 0)',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {heading}
        </h3>
       </div>
       </div>
       <section className="section">
       <div className="container animated bounceInUp delay-1s">
          <div className="columns is-size-5-mobile is-size-5-tablet is-size-4-widescreen">
              <div className="column is-three-fifths is-offset-one-fifth"
                   style={{
                     backgroundImage: 'linear-gradient(rgb(255, 68, 0), yellow)',
                     borderRadius: '4px',
                   }}>
                  <PreviewImage imageInfo={main.image1}/>
                <div className="section">
                <div className="tile is-parent">
                  <div className="tile is-child notification is-success">
                    <div className="content">
                        <h3 className="title is-2">
                          {mainpitch.title}
                        </h3>
                        <p className="subtitle is-4">
                          {mainpitch.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
       <div className="container section">
       <IconMenu
       firstLink={firstLink}
       secondLink={secondLink}
       thirdLink={thirdLink}
       fourthLink={fourthLink}
       />
       </div>
        <section className="section">
          <PageContent className="container content" content={content} />
        </section>
      </div>
)
}

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

class HomePage extends React.Component {

  render() {
    let data;
    let dataMarkdown = [];
    if (this.props.data !== null) {
      dataMarkdown = this.props.data.markdownRemark
      data = this.props.data;
    }
    const jsonData = data.allArticlesJson.edges[0].node.articles;
    const langKey = dataMarkdown.frontmatter.lang
    const sel = select(langKey);


    return (
      <Layout className="content" data={this.props.data} jsonData={jsonData} location={this.props.location}>
        <div>
            <HomePageTemplate
            image={dataMarkdown.frontmatter.image}
            heading={dataMarkdown.frontmatter.heading}
            mainpitch={dataMarkdown.frontmatter.mainpitch}
            main={dataMarkdown.frontmatter.main}
            contentComponent={HTMLContent}
            title={dataMarkdown.frontmatter.title}
            content={dataMarkdown.html}
            firstLink={iconLinks.painting[sel]}
            secondLink={iconLinks.sculpture[sel]}
            thirdLink={iconLinks.performance[sel]}
            fourthLink={iconLinks.interactivity[sel]}
             />
        </div>
      </Layout>
    )
  }
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default HomePage

export const pageQuery = graphql`
  query HomePageQuery($id: String!) {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
    allArticlesJson(filter:{title:{eq:"home"}}){
   edges{
     node{
       articles {
         en
         it
       }
     }
   }
 }
    markdownRemark(id: {eq: $id}) {
      html
      frontmatter {
        id
        title
        lang
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        mainpitch {
          title
          description
        }
        main {
          image1 {
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 500, quality: 90) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
          }
        }
      }
      fields {
        slug
      }
    }
  }
`
