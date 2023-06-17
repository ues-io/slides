import { definition, hooks, api } from "@uesio/ui"

const Component: definition.UC = ({ context }) => {
	const getCurrentStep = () => parseInt(context.getParam("step") || "0", 10)

	const navigateToStep = (step: number) =>
		api.signal.run(
			{
				signal: "route/NAVIGATE",
				path: `presentation/${step}`,
			},
			context
		)

	hooks.useHotKeyCallback("right", () => {
		console.log("forward", context.getParam("step"))
		navigateToStep(getCurrentStep() + 1)
	})

	hooks.useHotKeyCallback("left", () => {
		console.log("backward", context.getParam("step"))
		const currentStep = getCurrentStep()
		if (currentStep === 0) return
		navigateToStep(currentStep - 1)
	})
	return null
}

export default Component
