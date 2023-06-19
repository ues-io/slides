import { styles, definition, component } from "@uesio/ui"
import { useState } from "react"

const Component: definition.UC = (props) => {
	const CodeField = component.getUtility("uesio/io.codefield")
	const Grid = component.getUtility("uesio/io.grid")

	const [html, setHTML] = useState(
		`<div id="myelement">
	The web
	<span class="magic">has</span>
	<span class="zebras">declarative</span>
	roots.
	<br>
	<br>
	<br>
	Writing documents for the web was easy.
</div>`
	)
	const [css, setCSS] = useState(
		`#myelement {
	color: white;
	padding: 8px;
	font-size: 16pt;
}

.magic {
	color: pink;
	font-weight: bold;
}

.zebras {
	color: orange;
	font-weight: light;
}`
	)

	const classes = styles.useStyleTokens(
		{
			root: [
				"grid-cols-2",
				"p-2",
				"border-2",
				"border-white",
				"rounded-lg",
				"gap-2",
			],
			inner: ["grid-rows-2", "gap-2"],
			input: ["w-full", "h-full"],
			codepanel: ["grid", "grid-rows-[min-content_1fr]"],
			panelheader: ["text-white", "p-1"],
		},
		props
	)

	return (
		<Grid className={classes.root} context={props.context}>
			<div dangerouslySetInnerHTML={{ __html: html }} />
			<style
				dangerouslySetInnerHTML={{
					__html: css,
				}}
			/>
			<Grid className={classes.inner} context={props.context}>
				<div className={classes.codepanel}>
					<div className={classes.panelheader}>HTML</div>
					<CodeField
						classes={{
							input: classes.input,
						}}
						theme="vs-dark"
						value={html}
						setValue={(value: string) => {
							setHTML(value)
						}}
						language={"html"}
						context={props.context}
						options={{
							lineNumbersMinChars: 0,
						}}
					/>
				</div>
				<div className={classes.codepanel}>
					<div className={classes.panelheader}>CSS</div>
					<CodeField
						classes={{
							input: classes.input,
						}}
						theme="vs-dark"
						value={css}
						setValue={(value: string) => {
							setCSS(value)
						}}
						language={"css"}
						context={props.context}
						options={{
							lineNumbersMinChars: 0,
						}}
					/>
				</div>
			</Grid>
		</Grid>
	)
}

export default Component
