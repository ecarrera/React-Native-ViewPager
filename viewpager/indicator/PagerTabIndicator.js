/**
 * Created by tangzhibin on 16/5/11.
 * Edited by ecarrera on 18/3/1
 */

'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ViewPropTypes, Image, Text, TouchableOpacity } from 'react-native'
import IndicatorViewPager from '../IndicatorViewPager';
import BadgeCounter from './BadgeCounter';

export default class PagerTabIndicator extends Component {

    constructor(props){
        super(props);
    }

    static propTypes = {
        ...ViewPropTypes,
        initialPage: PropTypes.number,
        pager: PropTypes.instanceOf(IndicatorViewPager),
        tabs: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            iconSource: Image.propTypes.source,
            selectedIconSource: Image.propTypes.source,
            counter: PropTypes.number
        })).isRequired,
        itemStyle: ViewPropTypes.style,
        selectedItemStyle: ViewPropTypes.style,
        iconStyle: Image.propTypes.style,
        selectedIconStyle: Image.propTypes.style,
        textStyle: Text.propTypes.style,
        selectedTextStyle: Text.propTypes.style,
        changePageWithAnimation: PropTypes.bool,
    }

    static defaultProps = {
        tabs: [],
        changePageWithAnimation: true
    }

    state = {
        selectedIndex: this.props.initialPage
    }

    render () {
        let {
            tabs, pager, style, itemStyle, selectedItemStyle, iconStyle,
            selectedIconStyle, textStyle, selectedTextStyle, changePageWithAnimation
        } = this.props
        if (!tabs || tabs.length === 0) return null

        let tabsView = tabs.map((tab, index) => {
            let isSelected = this.state.selectedIndex === index
            
            let counter = tab.counter && tab.counter>0 
                ? <NotificationCounter counter={tab.counter}/> 
                : null;

            return (
                <TouchableOpacity
                    style={[styles.itemContainer, isSelected ? selectedItemStyle : itemStyle]}
                    activeOpacity={0.6}
                    key={index}
                    onPress={() => {
                        if(index==0){
                            tab.counter = 0;
                        }
                        if (!isSelected){
                            if (this.props.changePageWithAnimation)
                                pager.setPage(index);
                            else pager.setPageWithoutAnimation(index);
                        }
                    }}
                >
                    <Image
                        style={[styles.image, isSelected ? selectedIconStyle : iconStyle]}
                        source={isSelected ? tab.selectedIconSource : tab.iconSource}
                    />
                    <Text
                        style={[isSelected ? styles.textSelected : styles.text, isSelected ? selectedTextStyle : textStyle]}
                    >
                        {tab.text}
                    </Text>

                    {counter}

                </TouchableOpacity>
            )
        })
        return (
            <View style={[styles.container, style]} >
                {tabsView}
            </View>
        )
    }

    onPageSelected (e) {
        this.setState({selectedIndex: e.position})
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 8,
        paddingBottom: 4,
        borderTopWidth: 0.5,
        borderTopColor: '#aaa',
        backgroundColor: '#fff',
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 1,
    },
    itemContainer: {
        alignItems: 'center',
        flex: 1
    },
    image: {},
    text: {
        marginTop: 4,
        fontSize: 9,
        color: '#444'
    },
    textSelected: {
        marginTop: 4,
        fontSize: 9,
        color: '#ffce00'
    }
})